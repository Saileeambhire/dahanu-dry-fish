import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { products as defaultProducts } from "@/data/products";
import { isSupabaseConfigured, supabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src", "data", "products.json");

function getStoredProductsLocal() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading products.json:", error);
  }
  return defaultProducts;
}

function saveProductsLocal(productsList) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(productsList, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing products.json:", error);
    return false;
  }
}

// Convert DB row (snake_case) to Frontend Product (camelCase)
function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    localName: row.local_name || "",
    nameMr: row.name_mr || "",
    category: row.category,
    image: row.image,
    badge: row.badge || "",
    shortDescription: row.short_description || "",
    longDescription: row.long_description || "",
    isFeatured: Boolean(row.is_featured),
    rating: Number(row.rating) || 5.0,
    reviewsCount: Number(row.reviews_count) || 10,
    weightOptions: Array.isArray(row.weight_options) ? row.weight_options : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    culinaryUse: row.culinary_use || "",
    createdAt: row.created_at,
  };
}

// Convert Frontend Product (camelCase) to DB row (snake_case)
function productToRow(p) {
  return {
    id: p.id,
    name: p.name,
    local_name: p.localName || p.nameMr || "",
    name_mr: p.nameMr || p.localName || "",
    category: p.category,
    image: p.image,
    badge: p.badge || null,
    short_description: p.shortDescription || "",
    long_description: p.longDescription || "",
    is_featured: Boolean(p.isFeatured),
    rating: Number(p.rating) || 5.0,
    reviews_count: Number(p.reviewsCount) || 10,
    weight_options: Array.isArray(p.weightOptions) ? p.weightOptions : [],
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    culinary_use: p.culinaryUse || "",
    updated_at: new Date().toISOString(),
  };
}

// GET: Fetch products from Supabase (or fallback to local JSON)
export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const client = supabaseAdmin || supabase;
      const { data, error } = await client
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(rowToProduct);
        // Also keep local JSON in sync in background
        saveProductsLocal(mapped);
        return NextResponse.json({
          success: true,
          storage: "supabase",
          products: mapped,
        });
      }
    } catch (sbError) {
      console.warn("Supabase fetch failed, falling back to local:", sbError);
    }
  }

  const localProducts = getStoredProductsLocal();
  return NextResponse.json({
    success: true,
    storage: "local",
    products: localProducts,
  });
}

// POST: Manage products (add, update, updatePrice, delete, reset, sync_to_supabase)
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, product, products: newProductsList, id, weightIndex, newPrice } = body;
    const client = isSupabaseConfigured() ? supabaseAdmin || supabase : null;

    // ACTION: Sync local catalog to Supabase in one click
    if (action === "sync_to_supabase") {
      if (!client) {
        return NextResponse.json(
          { success: false, error: "Supabase credentials are not configured in .env.local yet." },
          { status: 400 }
        );
      }

      const localList = getStoredProductsLocal();
      const rows = localList.map(productToRow);

      const { data, error } = await client
        .from("products")
        .upsert(rows, { onConflict: "id" });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Successfully synced ${localList.length} products to Supabase PostgreSQL!`,
      });
    }

    let currentList = getStoredProductsLocal();

    if (action === "saveAll" && Array.isArray(newProductsList)) {
      currentList = newProductsList;
      if (client) {
        await client.from("products").upsert(newProductsList.map(productToRow));
      }
    } else if (action === "add" && product) {
      const newProduct = {
        ...product,
        id: product.id || `dry-${Date.now()}`,
        rating: Number(product.rating) || 5.0,
        reviewsCount: Number(product.reviewsCount) || 10,
        weightOptions: product.weightOptions?.length
          ? product.weightOptions
          : [{ label: "500g", price: 300 }],
      };
      currentList.unshift(newProduct);

      if (client) {
        const row = productToRow(newProduct);
        await client.from("products").insert(row);
      }
    } else if (action === "update" && product && product.id) {
      currentList = currentList.map((p) =>
        p.id === product.id ? { ...p, ...product } : p
      );

      if (client) {
        const target = currentList.find((p) => p.id === product.id);
        if (target) {
          await client.from("products").upsert(productToRow(target));
        }
      }
    } else if (action === "updatePrice" && id !== undefined && weightIndex !== undefined) {
      currentList = currentList.map((p) => {
        if (p.id === id && p.weightOptions?.[weightIndex]) {
          const updatedOptions = [...p.weightOptions];
          updatedOptions[weightIndex] = {
            ...updatedOptions[weightIndex],
            price: Number(newPrice),
          };
          return { ...p, weightOptions: updatedOptions };
        }
        return p;
      });

      if (client) {
        const target = currentList.find((p) => p.id === id);
        if (target) {
          await client
            .from("products")
            .update({
              weight_options: target.weightOptions,
              updated_at: new Date().toISOString(),
            })
            .eq("id", id);
        }
      }
    } else if (action === "delete" && id) {
      currentList = currentList.filter((p) => p.id !== id);
      if (client) {
        await client.from("products").delete().eq("id", id);
      }
    } else if (action === "reset") {
      currentList = defaultProducts;
      if (client) {
        await client.from("products").upsert(defaultProducts.map(productToRow));
      }
    }

    // Always update local JSON as resilient backup
    saveProductsLocal(currentList);

    return NextResponse.json({
      success: true,
      storage: client ? "supabase" : "local",
      products: currentList,
      message: "Products updated successfully",
    });
  } catch (error) {
    console.error("API products error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
