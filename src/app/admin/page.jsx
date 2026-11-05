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
  UploadCloud,
  Camera,
  Loader2,
  Link as LinkIcon,
  Database,
  Server,
  Cloud,
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

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageSourceTab, setImageSourceTab] = useState("upload");
  const [isDragOver, setIsDragOver] = useState(false);
  const [directUpdatingId, setDirectUpdatingId] = useState(null);

  // Database & Cloud Storage State
  const [dbStorageType, setDbStorageType] = useState("local");
  const [isSyncingToSupabase, setIsSyncingToSupabase] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);

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

    async function checkDb() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.storage) {
            setDbStorageType(data.storage);
          }
        }
      } catch {}
    }

    checkAuth();
    checkDb();
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

  // Sync to Supabase Database
  const handleSyncToSupabase = async () => {
    setIsSyncingToSupabase(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_to_supabase" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("🚀 " + (data.message || "Data synced to Supabase!"));
        setDbStorageType("supabase");
      } else {
        showToast("⚠️ " + (data.error || "Sync failed. Check Supabase credentials in .env.local"), "error");
      }
    } catch {
      showToast("Sync request failed. Make sure your server is running.", "error");
    } finally {
      setIsSyncingToSupabase(false);
    }
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
    setImageSourceTab("upload");
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
    setImageSourceTab("upload");
    setIsEditing(true);
    setIsFormOpen(true);
  };

  // Image Upload Handlers
  const uploadImageFile = async (file) => {
    if (!file) return null;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (JPG, PNG, WEBP, AVIF).", "error");
      return null;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("Image exceeds 10MB limit. Please upload a smaller file.", "error");
      return null;
    }

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || "Upload failed");
    }

    return result.url;
  };

  const handleModalImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
        showToast("📸 Image uploaded and linked to product!");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({ ...prev, image: e.target.result }));
          showToast("Image loaded from device.");
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDirectProductImageUpload = async (productId, file) => {
    if (!file) return;
    setDirectUpdatingId(productId);
    try {
      const url = await uploadImageFile(file);
      if (url) {
        await updateProduct(productId, { image: url });
        showToast("📸 Product photo updated successfully!");
      }
    } catch (err) {
      console.error("Direct upload error:", err);
      showToast("Failed to upload image. Please try again.", "error");
    } finally {
      setDirectUpdatingId(null);
    }
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
            {/* Database & Cloud Storage Status */}
            <button
              type="button"
              onClick={() => setShowDbModal(true)}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-colors ${
                dbStorageType === "supabase"
                  ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900"
                  : "bg-navy-800 border-ocean/40 text-sand hover:text-white hover:bg-navy-700"
              }`}
              title="Database & Image Storage Settings"
            >
              <Database className="w-3.5 h-3.5 text-brandOrange" />
              <span>{dbStorageType === "supabase" ? "Supabase Cloud" : "Database"}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  dbStorageType === "supabase" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
            </button>

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
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand-light border border-sand-dark shrink-0 group/img shadow-xs">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                            unoptimized={p.image?.startsWith("data:")}
                          />
                          {/* Quick upload overlay */}
                          <label
                            className={`absolute inset-0 bg-navy/70 backdrop-blur-xs flex flex-col items-center justify-center text-white cursor-pointer transition-opacity ${
                              directUpdatingId === p.id
                                ? "opacity-100"
                                : "opacity-0 group-hover/img:opacity-100"
                            }`}
                            title="Upload new photo for this product"
                          >
                            {directUpdatingId === p.id ? (
                              <Loader2 className="w-5 h-5 animate-spin text-brandOrange" />
                            ) : (
                              <>
                                <Camera className="w-4 h-4 mb-0.5 text-brandOrange" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Change</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              disabled={directUpdatingId === p.id}
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleDirectProductImageUpload(p.id, f);
                              }}
                            />
                          </label>
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

      {/* MODAL 0: DATABASE & STORAGE SETTINGS */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-cream rounded-3xl border border-sand-dark shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-navy-900 text-cream px-6 py-4 flex items-center justify-between border-b border-ocean/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brandOrange/20 border border-brandOrange/40 flex items-center justify-center text-brandOrange">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-cream">
                    Database & Cloud Storage
                  </h3>
                  <p className="text-[11px] text-sand/70">
                    PostgreSQL Database & CDN Image Bucket (Supabase)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDbModal(false)}
                className="p-1.5 rounded-lg text-sand/60 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-navy">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  dbStorageType === "supabase"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}
              >
                <div className="mt-0.5">
                  {dbStorageType === "supabase" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm">
                    {dbStorageType === "supabase"
                      ? "Supabase Cloud Database Active"
                      : "Local Storage Mode Active"}
                  </p>
                  <p className="text-xs leading-relaxed opacity-90">
                    {dbStorageType === "supabase"
                      ? "Products, categories, and prices are syncing in real time with Supabase PostgreSQL. Uploaded photos are hosted in the product-images Supabase Storage bucket."
                      : "Your products and photos are currently stored in local JSON files and local uploads. To connect Supabase, add your credentials in .env.local."}
                  </p>
                </div>
              </div>

              {/* Sync Action */}
              <div className="p-4 bg-sand/40 rounded-2xl border border-sand-dark space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-navy">Sync Catalog to Database</h4>
                    <p className="text-[11px] text-navy/60">
                      Uploads all current products from your store into Supabase PostgreSQL.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isSyncingToSupabase}
                    onClick={handleSyncToSupabase}
                    className="inline-flex items-center gap-1.5 bg-brandOrange hover:bg-brandOrange-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all disabled:opacity-50"
                  >
                    {isSyncingToSupabase ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Syncing...</span>
                      </>
                    ) : (
                      <>
                        <Cloud className="w-3.5 h-3.5" />
                        <span>Sync Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step-by-step Setup Guide */}
              <div className="space-y-3">
                <h4 className="font-bold text-navy uppercase text-[11px] tracking-wider">
                  How to configure Supabase (Free):
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-[11px] text-navy/80 bg-white p-4 rounded-2xl border border-sand-dark">
                  <li>
                    Visit <strong>supabase.com</strong> and create a free project.
                  </li>
                  <li>
                    Go to <strong>Project Settings → API</strong> and copy your Project URL &amp; Anon Key.
                  </li>
                  <li>
                    Paste them into your <code className="bg-sand-light px-1.5 py-0.5 rounded font-mono text-[10px]">.env.local</code> file:
                    <pre className="mt-1.5 p-2 bg-navy-950 text-sand-light rounded-lg font-mono text-[10px] overflow-x-auto">
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
                    </pre>
                  </li>
                  <li>
                    Open <strong>SQL Editor</strong> in Supabase, paste the contents of <code className="bg-sand-light px-1.5 py-0.5 rounded font-mono text-[10px]">supabase/schema.sql</code>, and click <strong>Run</strong>.
                  </li>
                  <li>
                    Return here and click <strong>&quot;Sync Now&quot;</strong> to migrate all products to the database!
                  </li>
                </ol>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-sand/30 border-t border-sand-dark flex justify-end">
              <button
                type="button"
                onClick={() => setShowDbModal(false)}
                className="bg-navy hover:bg-navy-800 text-cream font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

              {/* Product Image Section: Upload / URL / Presets */}
              <div className="space-y-3 p-4 bg-sand/30 rounded-2xl border border-sand-dark/70">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy uppercase flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-brandOrange" />
                    Product Image
                  </label>
                  {formData.image ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      Image Attached
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      No Image Selected
                    </span>
                  )}
                </div>

                {/* Source Mode Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-sand-dark text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setImageSourceTab("upload")}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      imageSourceTab === "upload"
                        ? "bg-brandOrange text-white shadow-xs"
                        : "text-navy/70 hover:text-navy hover:bg-sand-light"
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSourceTab("url")}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      imageSourceTab === "url"
                        ? "bg-brandOrange text-white shadow-xs"
                        : "text-navy/70 hover:text-navy hover:bg-sand-light"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Image URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSourceTab("presets")}
                    className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      imageSourceTab === "presets"
                        ? "bg-brandOrange text-white shadow-xs"
                        : "text-navy/70 hover:text-navy hover:bg-sand-light"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Presets</span>
                  </button>
                </div>

                {/* TAB 1: UPLOAD FILE */}
                {imageSourceTab === "upload" && (
                  <div className="space-y-3">
                    {formData.image ? (
                      <div className="relative rounded-2xl overflow-hidden border border-sand-dark bg-white p-3.5 flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand-light border border-sand-dark shrink-0">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized={formData.image?.startsWith("data:")}
                          />
                        </div>
                        <div className="flex-grow min-w-0 space-y-1">
                          <p className="text-xs font-bold text-navy truncate">
                            {formData.image.startsWith("/uploads/")
                              ? formData.image.replace("/uploads/products/", "")
                              : formData.image.startsWith("data:")
                              ? "Uploaded local photo"
                              : formData.image}
                          </p>
                          <p className="text-[11px] text-navy/60">
                            {formData.image.startsWith("/uploads/")
                              ? "Saved to public/uploads/products"
                              : "Active product photo"}
                          </p>
                          <div className="flex items-center gap-3 pt-1">
                            <label className="text-[11px] font-bold text-brandOrange hover:underline cursor-pointer flex items-center gap-1">
                              <Camera className="w-3 h-3" />
                              <span>Replace</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleModalImageUpload(f);
                                }}
                              />
                            </label>
                            <span className="text-navy/30">•</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image: "" })}
                              className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragOver(false);
                          const f = e.dataTransfer.files?.[0];
                          if (f) handleModalImageUpload(f);
                        }}
                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                          isDragOver
                            ? "border-brandOrange bg-brandOrange/10 scale-[1.01]"
                            : "border-ocean/30 bg-white hover:border-brandOrange hover:bg-sand-light/40"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleModalImageUpload(f);
                          }}
                        />
                        {uploadingImage ? (
                          <div className="py-2 flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 text-brandOrange animate-spin" />
                            <p className="text-xs font-bold text-navy">Uploading product image...</p>
                            <p className="text-[11px] text-navy/60">Saving to /public/uploads/products</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-2xl bg-brandOrange/10 text-brandOrange flex items-center justify-center shadow-xs">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-navy">
                                Click to browse or drag & drop image
                              </p>
                              <p className="text-[11px] text-navy/60 mt-0.5">
                                JPG, PNG, WEBP, AVIF or GIF (up to 10MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </label>
                    )}
                  </div>
                )}

                {/* TAB 2: IMAGE URL */}
                {imageSourceTab === "url" && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-grow text-xs px-3.5 py-2.5 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-brandOrange"
                      />
                      {formData.image && (
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-sand-dark shrink-0">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized={formData.image?.startsWith("data:")}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-navy/60">
                      Paste a direct image URL from Unsplash, Cloudinary, or an external server.
                    </p>
                  </div>
                )}

                {/* TAB 3: COASTAL PRESETS */}
                {imageSourceTab === "presets" && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: img.url })}
                          className={`group relative aspect-video rounded-xl overflow-hidden border text-left transition-all ${
                            formData.image === img.url
                              ? "ring-2 ring-brandOrange border-brandOrange shadow-sm"
                              : "border-sand-dark hover:border-ocean opacity-80 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img.url}
                            alt={img.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-1.5 flex items-end">
                            <span className="text-[10px] font-bold text-white leading-tight">
                              {img.name}
                            </span>
                          </div>
                          {formData.image === img.url && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brandOrange text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
