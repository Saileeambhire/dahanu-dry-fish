import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { categories as defaultCategories } from "@/data/products";

const categoriesFilePath = path.join(process.cwd(), "src", "data", "categories.json");

const fallbackCategories = [
  { id: "all", name: "All Products", nameMr: "सर्व उत्पादने" },
  { id: "bombil", name: "Bombil (Bombay Duck)", nameMr: "सुका बोंबील" },
  { id: "prawns", name: "Prawns & Kolambi", nameMr: "सुकट आणि कोळंबी" },
  { id: "premium", name: "Surmai & Premium Cuts", nameMr: "सुरमई आणि प्रीमियम कट्स" },
  { id: "daily", name: "Bangda & Mandeli", nameMr: "बांगडा आणि मांदेली" },
];

function getStoredCategories() {
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

function saveCategories(categoriesList) {
  try {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categoriesList, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing categories.json:", error);
    return false;
  }
}

export async function GET() {
  const categories = getStoredCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(request) {
  try {
    const body = await request.json();
    let currentList = getStoredCategories();

    const { action, category, id } = body;

    if (action === "add" && category) {
      const slugId =
        category.id ||
        category.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      // Check if id already exists
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
        nameMr: category.nameMr?.trim() || category.name.trim(),
      };

      currentList.push(newCat);
    } else if (action === "update" && category && category.id) {
      currentList = currentList.map((c) =>
        c.id === category.id
          ? {
              ...c,
              name: category.name ? category.name.trim() : c.name,
              nameMr: category.nameMr ? category.nameMr.trim() : c.nameMr,
            }
          : c
      );
    } else if (action === "delete" && id) {
      if (id === "all") {
        return NextResponse.json(
          { success: false, error: "Cannot delete the 'All Products' category" },
          { status: 400 }
        );
      }
      currentList = currentList.filter((c) => c.id !== id);
    } else if (action === "reset") {
      currentList = fallbackCategories;
    }

    const saved = saveCategories(currentList);

    return NextResponse.json({
      success: saved,
      categories: currentList,
      message: saved ? "Categories updated successfully" : "Failed to persist categories",
    });
  } catch (error) {
    console.error("API categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process category request" },
      { status: 500 }
    );
  }
}

