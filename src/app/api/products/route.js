import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { products as defaultProducts } from "@/data/products";

const dataFilePath = path.join(process.cwd(), "src", "data", "products.json");

function getStoredProducts() {
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

function saveProducts(productsList) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(productsList, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing products.json:", error);
    return false;
  }
}

export async function GET() {
  const products = getStoredProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request) {
  try {
    const body = await request.json();
    let currentList = getStoredProducts();

    const { action, product, products: newProductsList, id, weightIndex, newPrice } = body;

    if (action === "saveAll" && Array.isArray(newProductsList)) {
      currentList = newProductsList;
    } else if (action === "add" && product) {
      const newProduct = {
        ...product,
        id: product.id || `product-${Date.now()}`,
        rating: product.rating || 5.0,
        reviewsCount: product.reviewsCount || 0,
        weightOptions: product.weightOptions?.length
          ? product.weightOptions
          : [{ label: "500g", price: 300 }],
      };
      currentList.unshift(newProduct);
    } else if (action === "update" && product && product.id) {
      currentList = currentList.map((p) => (p.id === product.id ? { ...p, ...product } : p));
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
    } else if (action === "delete" && id) {
      currentList = currentList.filter((p) => p.id !== id);
    } else if (action === "reset") {
      currentList = defaultProducts;
    }

    const saved = saveProducts(currentList);

    return NextResponse.json({
      success: saved,
      products: currentList,
      message: saved ? "Products updated successfully" : "Failed to persist to file",
    });
  } catch (error) {
    console.error("API products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}

