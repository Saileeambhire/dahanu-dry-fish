"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { products as initialProducts, categories as defaultCategories } from "@/data/products";

const fallbackCategories = [
  { id: "all", name: "All Products", nameMr: "सर्व उत्पादने" },
  { id: "bombil", name: "Bombil (Bombay Duck)", nameMr: "सुका बोंबील" },
  { id: "prawns", name: "Prawns & Kolambi", nameMr: "सुकट आणि कोळंबी" },
  { id: "premium", name: "Surmai & Premium Cuts", nameMr: "सुरमई आणि प्रीमियम कट्स" },
  { id: "daily", name: "Bangda & Mandeli", nameMr: "बांगडा आणि मांदेली" },
];

const ProductContext = createContext({
  products: initialProducts,
  categories: fallbackCategories,
  loading: false,
  addProduct: async () => {},
  updateProduct: async () => {},
  updatePrice: async () => {},
  deleteProduct: async () => {},
  resetToDefault: async () => {},
  addCategory: async () => {},
  updateCategory: async () => {},
  deleteCategory: async () => {},
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  // Sync products and categories with API and localStorage on mount
  useEffect(() => {
    async function loadData() {
      try {
        // 1. Load products from localStorage first
        const localProducts = localStorage.getItem("dahanu_products");
        if (localProducts) {
          try {
            const parsed = JSON.parse(localProducts);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProducts(parsed);
            }
          } catch {}
        }

        // 2. Load categories from localStorage
        const localCategories = localStorage.getItem("dahanu_categories");
        if (localCategories) {
          try {
            const parsedCat = JSON.parse(localCategories);
            if (Array.isArray(parsedCat) && parsedCat.length > 0) {
              setCategories(parsedCat);
            }
          } catch {}
        }

        // 3. Fetch fresh products from API
        const resProd = await fetch("/api/products");
        if (resProd.ok) {
          const data = await resProd.json();
          if (data.success && Array.isArray(data.products)) {
            setProducts(data.products);
            localStorage.setItem("dahanu_products", JSON.stringify(data.products));
          }
        }

        // 4. Fetch fresh categories from API
        const resCat = await fetch("/api/categories");
        if (resCat.ok) {
          const catData = await resCat.json();
          if (catData.success && Array.isArray(catData.categories)) {
            setCategories(catData.categories);
            localStorage.setItem("dahanu_categories", JSON.stringify(catData.categories));
          }
        }
      } catch (err) {
        console.warn("Could not load data from API, using fallback:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const persistChange = useCallback(async (action, payload) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
    } catch (err) {
      console.warn("Failed to persist to /api/products:", err);
    }
  }, []);

  const persistCategoryChange = useCallback(async (action, payload) => {
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
    } catch (err) {
      console.warn("Failed to persist to /api/categories:", err);
    }
  }, []);

  // Add a new product
  const addProduct = useCallback(
    async (productData) => {
      const newProduct = {
        ...productData,
        id: productData.id || `dry-${Date.now()}`,
        rating: Number(productData.rating) || 5.0,
        reviewsCount: Number(productData.reviewsCount) || 0,
        weightOptions: productData.weightOptions?.length
          ? productData.weightOptions.map((w) => ({ ...w, price: Number(w.price) }))
          : [{ label: "500g", price: 350 }],
        highlights: Array.isArray(productData.highlights)
          ? productData.highlights
          : productData.highlights
          ? productData.highlights.split("\n").filter(Boolean)
          : ["Naturally sun-dried", "Zero chemicals"],
      };

      setProducts((prev) => {
        const updated = [newProduct, ...prev];
        localStorage.setItem("dahanu_products", JSON.stringify(updated));
        return updated;
      });

      await persistChange("add", { product: newProduct });
      return newProduct;
    },
    [persistChange]
  );

  // Update existing product
  const updateProduct = useCallback(
    async (id, updatedFields) => {
      let updatedProduct = null;

      setProducts((prev) => {
        const updated = prev.map((p) => {
          if (p.id === id) {
            updatedProduct = {
              ...p,
              ...updatedFields,
              weightOptions: updatedFields.weightOptions
                ? updatedFields.weightOptions.map((w) => ({ ...w, price: Number(w.price) }))
                : p.weightOptions,
              rating: updatedFields.rating !== undefined ? Number(updatedFields.rating) : p.rating,
              highlights: Array.isArray(updatedFields.highlights)
                ? updatedFields.highlights
                : typeof updatedFields.highlights === "string"
                ? updatedFields.highlights.split("\n").filter(Boolean)
                : p.highlights,
            };
            return updatedProduct;
          }
          return p;
        });
        localStorage.setItem("dahanu_products", JSON.stringify(updated));
        return updated;
      });

      if (updatedProduct) {
        await persistChange("update", { product: updatedProduct });
      }
      return updatedProduct;
    },
    [persistChange]
  );

  // Quick price change for a specific weight option
  const updatePrice = useCallback(
    async (id, weightIndex, newPrice) => {
      const parsedPrice = Math.max(0, Number(newPrice) || 0);

      setProducts((prev) => {
        const updated = prev.map((p) => {
          if (p.id === id && p.weightOptions?.[weightIndex]) {
            const newWeightOptions = [...p.weightOptions];
            newWeightOptions[weightIndex] = {
              ...newWeightOptions[weightIndex],
              price: parsedPrice,
            };
            return { ...p, weightOptions: newWeightOptions };
          }
          return p;
        });
        localStorage.setItem("dahanu_products", JSON.stringify(updated));
        return updated;
      });

      await persistChange("updatePrice", { id, weightIndex, newPrice: parsedPrice });
    },
    [persistChange]
  );

  // Delete product
  const deleteProduct = useCallback(
    async (id) => {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        localStorage.setItem("dahanu_products", JSON.stringify(updated));
        return updated;
      });

      await persistChange("delete", { id });
    },
    [persistChange]
  );

  // CATEGORY ACTIONS
  const addCategory = useCallback(
    async ({ name, nameMr, id }) => {
      const slugId =
        id ||
        name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const newCat = {
        id: slugId,
        name: name.trim(),
        nameMr: nameMr?.trim() || name.trim(),
      };

      setCategories((prev) => {
        if (prev.some((c) => c.id === slugId)) return prev;
        const updated = [...prev, newCat];
        localStorage.setItem("dahanu_categories", JSON.stringify(updated));
        return updated;
      });

      await persistCategoryChange("add", { category: newCat });
      return newCat;
    },
    [persistCategoryChange]
  );

  const updateCategory = useCallback(
    async (id, { name, nameMr }) => {
      let updatedCat = null;
      setCategories((prev) => {
        const updated = prev.map((c) => {
          if (c.id === id) {
            updatedCat = {
              ...c,
              name: name ? name.trim() : c.name,
              nameMr: nameMr ? nameMr.trim() : c.nameMr,
            };
            return updatedCat;
          }
          return c;
        });
        localStorage.setItem("dahanu_categories", JSON.stringify(updated));
        return updated;
      });

      if (updatedCat) {
        await persistCategoryChange("update", { category: updatedCat });
      }
      return updatedCat;
    },
    [persistCategoryChange]
  );

  const deleteCategory = useCallback(
    async (id) => {
      if (id === "all") return;
      setCategories((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        localStorage.setItem("dahanu_categories", JSON.stringify(updated));
        return updated;
      });

      await persistCategoryChange("delete", { id });
    },
    [persistCategoryChange]
  );

  // Reset to initial stock
  const resetToDefault = useCallback(async () => {
    setProducts(initialProducts);
    setCategories(fallbackCategories);
    localStorage.setItem("dahanu_products", JSON.stringify(initialProducts));
    localStorage.setItem("dahanu_categories", JSON.stringify(fallbackCategories));
    await persistChange("reset", {});
    await persistCategoryChange("reset", {});
  }, [persistChange, persistCategoryChange]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        addProduct,
        updateProduct,
        updatePrice,
        deleteProduct,
        resetToDefault,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
