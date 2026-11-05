import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const categoriesFilePath = path.join(process.cwd(), "src", "data", "categories.json");

const fallbackCategories = [
  { id: "all", name: "All Products", nameMr: "सर्व उत्पादने" },
  { id: "bombil", name: "Bombil (Bombay Duck)", nameMr: "सुका बोंबील" },
  { id: "prawns", name: "Prawns & Kolambi", nameMr: "सुकट आणि कोळंबी" },
  { id: "premium", name: "Surmai & Premium Cuts", nameMr: "सुरमई आणि प्रीमियम कट्स" },
  { id: "daily", name: "Bangda & Mandeli", nameMr: "बांगडा आणि मांदेली" },
];

function getStoredCategoriesLocal() {
  try {
    if (fs.existsSync(categoriesFilePath)) {
      const fileData = fs.readFileSync(categoriesFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading categories.json:", error);
  }
  return fallbackCategories;
}

function saveCategoriesLocal(categoriesList) {
  try {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categoriesList, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing categories.json:", error);
    return false;
  }
}

// Map DB row to category
function rowToCategory(row) {
  return {
    id: row.id,
    name: row.name,
    nameMr: row.name_mr || "",
    icon: row.icon || null,
  };
}

// Map Category to DB row
function categoryToRow(c) {
  return {
    id: c.id,
    name: c.name,
    name_mr: c.nameMr || "",
    icon: c.icon || null,
  };
}

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const client = supabaseAdmin || supabase;
      const { data, error } = await client
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(rowToCategory);
        saveCategoriesLocal(mapped);
        return NextResponse.json({
          success: true,
          storage: "supabase",
          categories: mapped,
        });
      }
    } catch (sbError) {
      console.warn("Supabase categories fetch failed:", sbError);
    }
  }

  const localCategories = getStoredCategoriesLocal();
  return NextResponse.json({
    success: true,
    storage: "local",
    categories: localCategories,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, category, id } = body;
    const client = isSupabaseConfigured() ? supabaseAdmin || supabase : null;

    let currentList = getStoredCategoriesLocal();

    if (action === "add" && category) {
      const slugId =
        category.id ||
        category.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const exists = currentList.some((c) => c.id === slugId);
      if (exists) {
        return NextResponse.json(
          { success: false, error: "A category with this ID already exists" },
          { status: 400 }
        );
      }

      const newCat = {
        id: slugId,
        name: category.name.trim(),
        nameMr: category.nameMr?.trim() || "",
        icon: category.icon || null,
      };

      currentList.push(newCat);

      if (client) {
        await client.from("categories").insert(categoryToRow(newCat));
      }
    } else if (action === "update" && category && category.id) {
      currentList = currentList.map((c) =>
        c.id === category.id
          ? {
              ...c,
              name: category.name.trim(),
              nameMr: category.nameMr?.trim() || "",
              icon: category.icon || c.icon,
            }
          : c
      );

      if (client) {
        const target = currentList.find((c) => c.id === category.id);
        if (target) {
          await client.from("categories").upsert(categoryToRow(target));
        }
      }
    } else if (action === "delete" && id) {
      if (id === "all") {
        return NextResponse.json(
          { success: false, error: "Cannot delete the default 'All' category." },
          { status: 400 }
        );
      }
      currentList = currentList.filter((c) => c.id !== id);

      if (client) {
        await client.from("categories").delete().eq("id", id);
      }
    } else if (action === "reset") {
      currentList = fallbackCategories;
      if (client) {
        await client.from("categories").upsert(fallbackCategories.map(categoryToRow));
      }
    }

    saveCategoriesLocal(currentList);

    return NextResponse.json({
      success: true,
      storage: client ? "supabase" : "local",
      categories: currentList,
      message: "Categories updated successfully",
    });
  } catch (error) {
    console.error("API categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
