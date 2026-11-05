"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { formatINR } from "@/lib/whatsapp";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Search,
  SlidersHorizontal,
  ArrowLeft,
  ExternalLink,
  Save,
  Package,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Star,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Tag,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const PRESET_IMAGES = [
  {
    name: "Dry Bombil",
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dry Prawns",
    url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dry Surmai",
    url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dry Bangda",
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dry Mandeli",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dry Kolambi",
    url: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "White Pomfret",
    url: "https://images.unsplash.com/photo-1510130387422-82ebd332a64e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Indian Salmon",
    url: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
  },
];

const EMPTY_FORM = {
  id: "",
  name: "",
  localName: "",
  category: "bombil",
  badge: "Fresh Catch",
  shortDescription: "",
  longDescription: "",
  image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
  isFeatured: true,
  rating: 5.0,
  reviewsCount: 10,
  weightOptions: [
    { label: "250g", price: 200 },
    { label: "500g", price: 380 },
    { label: "1kg", price: 720 },
  ],
  highlights: [
    "Naturally dried on traditional bamboo machans",
    "Zero chemical preservatives or artificial bleach",
    "Direct harvest from Dahanu coastline",
    "Hygienically cleaned and vacuum packed",
  ],
  culinaryUse: "Best for crispy rava fry, coastal thecha, or spicy curry.",
};

const EMPTY_CATEGORY_FORM = {
  id: "",
  name: "",
  nameMr: "",
};

export default function AdminDashboardPage() {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    updatePrice,
    deleteProduct,
    resetToDefault,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useProducts();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Dashboard Tab: 'products' | 'categories'
  const [activeTab, setActiveTab] = useState("products");

  // Product Manager State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [toastMessage, setToastMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Category Manager State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState(EMPTY_CATEGORY_FORM);
  const [deleteCatConfirmId, setDeleteCatConfirmId] = useState(null);

  // Quick inline price editing state
  const [inlinePrices, setInlinePrices] = useState({});
  const [savedStatus, setSavedStatus] = useState({});

  // Check auth status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const localAuth = localStorage.getItem("dahanu_admin_logged_in");
        if (localAuth === "true") {
          setIsAuthenticated(true);
        }

        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "check" }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            localStorage.setItem("dahanu_admin_logged_in", "true");
          }
        }
      } catch (err) {
        console.warn("Auth check failed:", err);
      } finally {
        setAuthChecking(false);
      }
    }

    checkAuth();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("dahanu_admin_logged_in", "true");
        showToast("Welcome back, Admin!");
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {}

    setIsAuthenticated(false);
    localStorage.removeItem("dahanu_admin_logged_in");
    showToast("Logged out successfully.");
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.localName && p.localName.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Product counts per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Product Form Open Handlers
  const handleOpenAdd = () => {
    const defaultCat = categories.find((c) => c.id !== "all")?.id || "bombil";
    setFormData({
      ...EMPTY_FORM,
      category: defaultCat,
      id: `dry-${Date.now()}`,
    });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setFormData({
      ...product,
      highlights: Array.isArray(product.highlights)
        ? product.highlights
        : product.highlights
        ? product.highlights.split("\n")
        : [],
    });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  // Weight Option handling inside product modal form
  const handleWeightChange = (index, field, value) => {
    const updated = [...formData.weightOptions];
    updated[index] = {
      ...updated[index],
      [field]: field === "price" ? Number(value) || 0 : value,
    };
    setFormData({ ...formData, weightOptions: updated });
  };

  const handleAddWeightOption = () => {
    setFormData({
      ...formData,
      weightOptions: [...formData.weightOptions, { label: "250g", price: 200 }],
    });
  };

  const handleRemoveWeightOption = (index) => {
    if (formData.weightOptions.length <= 1) {
      alert("A product must have at least one weight and price option.");
      return;
    }
    const updated = formData.weightOptions.filter((_, i) => i !== index);
    setFormData({ ...formData, weightOptions: updated });
  };

  // Handle Product Form Submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (isEditing) {
      await updateProduct(formData.id, formData);
      showToast(`✅ "${formData.name}" has been updated successfully!`);
    } else {
      await addProduct(formData);
      showToast(`🎉 "${formData.name}" has been added to your catalog!`);
    }

    setIsFormOpen(false);
  };

  // Quick Inline Price Editing
  const handleInlinePriceChange = (productId, weightIndex, value) => {
    setInlinePrices((prev) => ({
      ...prev,
      [`${productId}_${weightIndex}`]: value,
    }));
  };

  const handleSaveInlinePrice = async (productId, weightIndex, currentPrice) => {
    const key = `${productId}_${weightIndex}`;
    const newPriceVal = inlinePrices[key] !== undefined ? inlinePrices[key] : currentPrice;
    const finalPrice = Math.max(0, Number(newPriceVal) || 0);

    await updatePrice(productId, weightIndex, finalPrice);

    setSavedStatus((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [key]: false }));
    }, 2000);

    showToast(`💰 Price updated to ₹${finalPrice}!`);
  };

  const handleToggleFeatured = async (product) => {
    await updateProduct(product.id, { isFeatured: !product.isFeatured });
    showToast(
      product.isFeatured
        ? `Removed "${product.name}" from homepage featured list`
        : `⭐ "${product.name}" is now featured on the homepage!`
    );
  };

  const handleDelete = async (id, name) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
    showToast(`🗑️ "${name}" was deleted from your catalog.`);
  };

  const handleResetCatalog = async () => {
    await resetToDefault();
    setShowResetConfirm(false);
    showToast("🔄 Catalog reset to default products.");
  };

  // CATEGORY MANAGEMENT HANDLERS
  const handleOpenAddCategory = () => {
    setCategoryFormData(EMPTY_CATEGORY_FORM);
    setIsCategoryEditing(false);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setCategoryFormData({
      id: cat.id,
      name: cat.name,
      nameMr: cat.nameMr || "",
    });
    setIsCategoryEditing(true);
    setIsCategoryModalOpen(true);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (isCategoryEditing) {
      await updateCategory(categoryFormData.id, {
        name: categoryFormData.name,
        nameMr: categoryFormData.nameMr,
      });
      showToast(`✅ Category "${categoryFormData.name}" updated!`);
    } else {
      await addCategory({
        name: categoryFormData.name,
        nameMr: categoryFormData.nameMr,
        id: categoryFormData.id,
      });
      showToast(`🎉 Category "${categoryFormData.name}" created!`);
    }

    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = async (id, name) => {
    if (id === "all") {
      alert("The 'All Products' category cannot be deleted.");
      return;
    }
    await deleteCategory(id);
    setDeleteCatConfirmId(null);
    showToast(`🗑️ Category "${name}" was deleted.`);
  };

  // 1. Loading screen while verifying credentials
  if (authChecking) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brandOrange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sand text-sm font-semibold">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  // 2. ADMIN LOGIN SCREEN (When not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-900 text-cream flex items-center justify-center p-4 relative overflow-hidden">
        {/* Coastal Background Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandOrange/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-ocean/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full bg-navy-800/90 rounded-3xl border border-ocean/50 p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brandOrange to-ocean flex items-center justify-center text-white mx-auto shadow-orange-glow mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-cream tracking-tight">
              Admin Login Portal
            </h1>
            <p className="text-xs text-sand/70">
              दहाणू सुकी मासळी • Authorized Store Management Access
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-sand uppercase block mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full text-sm px-4 py-3 rounded-xl border border-ocean/60 bg-navy-900/90 text-cream placeholder-sand/40 focus:outline-none focus:border-brandOrange transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-sand uppercase block mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full text-sm px-4 py-3 pr-11 rounded-xl border border-ocean/60 bg-navy-900/90 text-cream placeholder-sand/40 focus:outline-none focus:border-brandOrange transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand/60 hover:text-sand"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-brandOrange hover:bg-brandOrange-hover text-white font-bold text-sm py-3.5 rounded-xl shadow-orange-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Help Credentials Card */}
          <div className="bg-navy-900/80 p-4 rounded-2xl border border-ocean/30 text-xs text-sand/80 space-y-2">
            <p className="font-bold text-brandOrange flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Default Admin Credentials:</span>
            </p>
            <div className="font-mono text-[11px] bg-navy-950 p-2 rounded-lg text-sand-light space-y-0.5">
              <p>Username: <strong className="text-cream">admin</strong></p>
              <p>Password: <strong className="text-cream">dahanu@2026</strong> <span className="text-sand/50">(or admin123)</span></p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoginUsername("admin");
                setLoginPassword("dahanu@2026");
              }}
              className="w-full text-center text-[11px] text-ocean-light hover:text-brandOrange underline font-semibold mt-1"
            >
              Auto-fill default admin credentials
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-sand/60 hover:text-brandOrange transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-sand-light/40 text-navy pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-navy text-cream px-5 py-3.5 rounded-2xl shadow-coastal-lg border border-brandOrange/40 flex items-center gap-3 animate-bounce-short">
          <span className="w-2.5 h-2.5 rounded-full bg-waGreen animate-pulse" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar with Logout */}
      <header className="bg-navy-900 text-cream border-b border-ocean/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-navy-800 hover:bg-ocean/40 text-sand transition-colors border border-ocean/50"
              title="Return to Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-cream tracking-tight">
                  Admin <span className="text-brandOrange">Dashboard</span>
                </span>
                <span className="bg-brandOrange/20 border border-brandOrange/40 text-brandOrange text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Logged In
                </span>
              </div>
              <p className="text-xs text-sand/70">
                दहाणू सुकी मासळी • Products, Prices & Category Management
              </p>
            </div>
          </div>

          {/* Navigation & Logout */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand hover:text-white bg-navy-800 hover:bg-navy-700 px-3 py-2 rounded-xl border border-ocean/40 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleOpenAddCategory}
              className="inline-flex items-center gap-1.5 bg-navy-800 hover:bg-ocean text-sand hover:text-white text-xs font-bold px-3 py-2 rounded-xl border border-ocean/40 transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-brandOrange" />
              <span>+ New Category</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 bg-brandOrange hover:bg-brandOrange-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-orange-glow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Product</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Products vs Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 border-t border-ocean/30 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`py-2 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-brandOrange text-brandOrange"
                : "border-transparent text-sand/70 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Prices ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "categories"
                ? "border-brandOrange text-brandOrange"
                : "border-transparent text-sand/70 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length - 1})</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-sand-dark shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-navy/60 font-semibold uppercase">Total Products</p>
              <p className="text-2xl font-extrabold text-navy">{products.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-dark shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brandOrange/10 text-brandOrange flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-navy/60 font-semibold uppercase">Active Categories</p>
              <p className="text-2xl font-extrabold text-navy">{categories.length - 1}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-dark shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Star className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <p className="text-xs text-navy/60 font-semibold uppercase">Homepage Featured</p>
              <p className="text-2xl font-extrabold text-navy">
                {products.filter((p) => p.isFeatured).length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-dark shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-navy/60 font-semibold uppercase">Factory Reset</p>
              <p className="text-xs text-navy/60 mt-0.5">Restore stock & categories</p>
            </div>
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="p-2.5 rounded-xl border border-sand-dark hover:bg-rose-50 text-rose-600 transition-colors"
              title="Reset to default products"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: CATEGORY MANAGER */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-sand-dark shadow-coastal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-navy">
                  Category Management (श्रेणी व्यवस्थापन)
                </h2>
                <p className="text-xs text-navy/60 mt-1">
                  Add custom categories to organize your dry fish products. These categories appear on the shop page filters and the product form.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddCategory}
                className="inline-flex items-center gap-2 bg-brandOrange hover:bg-brandOrange-hover text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-orange-glow transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Category</span>
              </button>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-3xl border border-sand-dark shadow-sm overflow-hidden">
              <div className="divide-y divide-sand-dark/40">
                {categories.map((cat) => {
                  const isAll = cat.id === "all";
                  const count = isAll ? products.length : categoryCounts[cat.id] || 0;

                  return (
                    <div
                      key={cat.id}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-sand-light/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center font-bold">
                          <Tag className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading font-bold text-base text-navy">
                              {cat.name}
                            </h3>
                            {cat.nameMr && (
                              <span className="text-xs font-bold text-ocean bg-ocean/10 px-2 py-0.5 rounded-md">
                                {cat.nameMr}
                              </span>
                            )}
                            {isAll && (
                              <span className="text-[10px] font-bold text-navy/50 bg-sand-light px-2 py-0.5 rounded-md uppercase">
                                System Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-navy/60 font-mono mt-0.5">
                            ID / Slug: <span className="font-bold text-navy">{cat.id}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-xs font-bold bg-sand px-3 py-1.5 rounded-lg text-navy">
                          {count} {count === 1 ? "Product" : "Products"}
                        </span>

                        <div className="flex items-center gap-2">
                          {!isAll && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenEditCategory(cat)}
                                className="p-2 rounded-xl border border-sand-dark hover:bg-sand text-navy transition-colors"
                                title="Edit Category"
                              >
                                <Edit3 className="w-4 h-4 text-ocean" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeleteCatConfirmId(cat.id)}
                                className="p-2 rounded-xl border border-sand-dark hover:bg-rose-50 text-rose-600 transition-colors"
                                title="Delete Category"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & PRICE MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Search, Filter & Action Toolbar */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand-dark shadow-coastal space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by English or Marathi name..."
                    className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-sand-dark bg-sand-light/30 focus:bg-white focus:outline-none focus:border-brandOrange"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy/50 hover:text-navy"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Add Product Button */}
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-800 text-cream text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 text-brandOrange" />
                  <span>New Product</span>
                </button>
              </div>

              {/* Category Filter Pills (Dynamically loaded from categories!) */}
              <div className="pt-3 border-t border-sand-dark/40 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        isSelected
                          ? "bg-navy text-cream shadow-sm"
                          : "bg-sand-light/70 text-navy/70 hover:bg-sand"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Catalog List with Quick Price Modifier */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-navy">
                  Catalog Items ({filteredProducts.length})
                </h2>
                <span className="text-xs text-navy/60 hidden sm:inline">
                  💡 Tip: Type directly in the price boxes below and click the checkmark to change prices instantly!
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-sand-dark space-y-4">
                  <Package className="w-12 h-12 text-navy/30 mx-auto" />
                  <h3 className="text-lg font-bold text-navy">No products match your search</h3>
                  <p className="text-sm text-navy/60">Try clearing your search query or add a new catch.</p>
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="inline-flex items-center gap-2 bg-brandOrange text-white font-bold text-sm px-5 py-2.5 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product Now</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl p-5 border border-sand-dark hover:border-brandOrange/40 shadow-sm transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-start gap-4 min-w-[280px]">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand-light border border-sand-dark shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[11px] font-bold text-ocean uppercase bg-sand-light px-2 py-0.5 rounded-md">
                              {categories.find((c) => c.id === p.category)?.name || p.category}
                            </span>
                            {p.badge && (
                              <span className="text-[10px] font-bold bg-brandOrange/15 text-brandOrange border border-brandOrange/30 px-2 py-0.5 rounded-md">
                                {p.badge}
                              </span>
                            )}
                            {p.isFeatured && (
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-500" />
                                Featured
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-base text-navy leading-snug">
                            {p.name}
                          </h3>
                          <p className="text-xs font-semibold text-ocean/80">{p.localName}</p>
                          <p className="text-[11px] text-navy/60 line-clamp-1 mt-1 max-w-sm">
                            {p.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Quick Price Modification per Weight Option */}
                      <div className="w-full lg:w-auto flex-grow bg-sand-light/50 p-3.5 rounded-xl border border-sand-dark">
                        <span className="text-[11px] font-bold text-navy/70 uppercase tracking-wider block mb-2">
                          Change Prices (Click & Save):
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          {p.weightOptions?.map((w, idx) => {
                            const key = `${p.id}_${idx}`;
                            const currentInputVal =
                              inlinePrices[key] !== undefined ? inlinePrices[key] : w.price;
                            const isSaved = savedStatus[key];

                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-sand-dark shadow-xs"
                              >
                                <span className="text-xs font-bold text-navy/70 min-w-[36px]">
                                  {w.label}:
                                </span>
                                <span className="text-xs font-bold text-brandOrange">₹</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={currentInputVal}
                                  onChange={(e) =>
                                    handleInlinePriceChange(p.id, idx, e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSaveInlinePrice(p.id, idx, w.price);
                                    }
                                  }}
                                  className="w-16 text-xs font-bold text-navy px-1.5 py-0.5 rounded border border-sand-dark/70 focus:outline-none focus:border-brandOrange"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveInlinePrice(p.id, idx, w.price)}
                                  className={`p-1 rounded transition-colors ${
                                    isSaved
                                      ? "bg-waGreen text-white"
                                      : "hover:bg-sand text-navy/70 hover:text-navy"
                                  }`}
                                  title="Save this price"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-2.5 rounded-xl border transition-colors ${
                            p.isFeatured
                              ? "bg-amber-50 text-amber-600 border-amber-300"
                              : "border-sand-dark text-navy/50 hover:bg-sand-light"
                          }`}
                          title={p.isFeatured ? "Un-feature from homepage" : "Feature on homepage"}
                        >
                          <Star className={`w-4 h-4 ${p.isFeatured ? "fill-amber-500" : ""}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="inline-flex items-center gap-1.5 bg-navy hover:bg-navy-800 text-cream px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-brandOrange" />
                          <span>Edit Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-2.5 rounded-xl border border-sand-dark text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD / EDIT CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
          <div className="bg-cream rounded-3xl border border-sand-dark shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-cream border-b border-sand-dark px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy">
                  {isCategoryEditing ? "Edit Category" : "Create New Category"}
                </h3>
                <p className="text-xs text-navy/60">
                  Organize your dry seafood catalog into categories.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 rounded-xl text-navy/60 hover:text-navy hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCategory} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-1">
                  Category Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, name: e.target.value })
                  }
                  placeholder="e.g. Dry Jawla & Karandi, Crab Special"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-1">
                  Category Marathi Name (स्थानिक नाव)
                </label>
                <input
                  type="text"
                  value={categoryFormData.nameMr}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, nameMr: e.target.value })
                  }
                  placeholder="e.g. सुका जवळा आणि करंदी"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange font-semibold text-ocean"
                />
              </div>

              {!isCategoryEditing && (
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Custom ID / Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.id}
                    onChange={(e) =>
                      setCategoryFormData({ ...categoryFormData, id: e.target.value })
                    }
                    placeholder="Auto-generated from name if left empty"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange font-mono"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sand-dark">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-navy/70 hover:bg-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-brandOrange hover:bg-brandOrange-hover text-white text-xs font-bold px-5 py-2 rounded-xl shadow-orange-glow"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isCategoryEditing ? "Update Category" : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT PRODUCT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-navy-900/80 backdrop-blur-sm">
          <div className="bg-cream rounded-3xl border border-sand-dark shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-cream border-b border-sand-dark px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-heading text-xl font-bold text-navy">
                  {isEditing ? `Edit Product: ${formData.name}` : "Add New Dry Fish Product"}
                </h3>
                <p className="text-xs text-navy/60">
                  Fill in product names, weight tiers, prices, and coastal description.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-xl text-navy/60 hover:text-navy hover:bg-sand transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 space-y-6">
              {/* Product Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dry Bombil (Bombay Duck)"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Marathi Name (स्थानिक नाव)
                  </label>
                  <input
                    type="text"
                    value={formData.localName}
                    onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                    placeholder="e.g. सुका बोंबील"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange font-semibold text-ocean"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange font-semibold text-navy"
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} {cat.nameMr ? `(${cat.nameMr})` : ""}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Best Seller, Most Popular, Chef's Selection"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>
              </div>

              {/* WEIGHT TIERS & PRICES (CORE FUNCTIONALITY) */}
              <div className="bg-sand-light/60 p-5 rounded-2xl border border-sand-dark space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-navy uppercase tracking-wider">
                      Pack Sizes & Prices (₹) *
                    </h4>
                    <p className="text-xs text-navy/60">
                      Configure different weight packs and their selling prices.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddWeightOption}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-navy text-cream px-3 py-1.5 rounded-lg hover:bg-ocean transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-brandOrange" />
                    <span>Add Weight Tier</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.weightOptions.map((w, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-sand-dark"
                    >
                      <div className="w-1/2">
                        <label className="text-[10px] font-bold text-navy/60 block mb-0.5">
                          Weight Label
                        </label>
                        <input
                          type="text"
                          required
                          value={w.label}
                          onChange={(e) => handleWeightChange(index, "label", e.target.value)}
                          placeholder="e.g. 250g, 500g, 1kg"
                          className="w-full text-xs font-bold px-2.5 py-1.5 rounded-lg border border-sand-dark/70 focus:outline-none focus:border-brandOrange"
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="text-[10px] font-bold text-navy/60 block mb-0.5">
                          Price in ₹ (INR)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brandOrange">
                            ₹
                          </span>
                          <input
                            type="number"
                            required
                            min="0"
                            value={w.price}
                            onChange={(e) => handleWeightChange(index, "price", e.target.value)}
                            placeholder="e.g. 400"
                            className="w-full text-xs font-bold pl-7 pr-2.5 py-1.5 rounded-lg border border-sand-dark/70 focus:outline-none focus:border-brandOrange"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveWeightOption(index)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg mt-3 transition-colors"
                        title="Remove weight tier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image URL & Quick Preset Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-navy uppercase block">
                  Product Image URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="flex-grow text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                  {formData.image && (
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-sand-dark shrink-0">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[11px] font-bold text-navy/60 block mb-1">
                    Or select an authentic coastal photo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: img.url })}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                          formData.image === img.url
                            ? "bg-brandOrange text-white border-brandOrange"
                            : "bg-white text-navy/70 border-sand-dark hover:border-ocean"
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Short Description (shown on card preview)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    placeholder="1-2 sentences highlighting crisp texture & authentic Dahanu taste."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.longDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, longDescription: e.target.value })
                    }
                    placeholder="Traditional craft details, bamboo machan drying, sea salt curing..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Culinary Tip (How to Cook)
                  </label>
                  <input
                    type="text"
                    value={formData.culinaryUse || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, culinaryUse: e.target.value })
                    }
                    placeholder="e.g. Best for crispy rava fry, Koli style curry, or dry spicy chutney."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>
              </div>

              {/* Homepage Featured Switch */}
              <div className="flex items-center justify-between p-4 bg-sand-light/50 rounded-2xl border border-sand-dark">
                <div>
                  <p className="text-xs font-bold text-navy uppercase">Feature on Homepage</p>
                  <p className="text-xs text-navy/60">
                    Display this catch in the &quot;Featured Coastal Catch&quot; section on the front page.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-5 h-5 accent-brandOrange cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-sand-dark">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-navy/70 hover:bg-sand transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-brandOrange hover:bg-brandOrange-hover text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-orange-glow transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? "Save Product Changes" : "Add Product to Store"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-sand-dark shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-navy">Delete this product?</h3>
            <p className="text-xs text-navy/70">
              Are you sure you want to remove this dry fish item from your catalog?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold border border-sand-dark hover:bg-sand-light transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = products.find((p) => p.id === deleteConfirmId);
                  handleDelete(deleteConfirmId, target?.name || "Product");
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {deleteCatConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-sand-dark shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-navy">Delete Category?</h3>
            <p className="text-xs text-navy/70">
              Are you sure? Products belonging to this category will not be deleted, but they should be assigned to a new category.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCatConfirmId(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold border border-sand-dark hover:bg-sand-light transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = categories.find((c) => c.id === deleteCatConfirmId);
                  handleDeleteCategory(deleteCatConfirmId, target?.name || "Category");
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-sand-dark shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-navy">Reset Entire Catalog?</h3>
            <p className="text-xs text-navy/70">
              This will restore all default products, categories, and original price lists.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold border border-sand-dark hover:bg-sand-light transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetCatalog}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-navy hover:bg-navy-800 text-white transition-colors"
              >
                Reset Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
