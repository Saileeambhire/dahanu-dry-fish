-- ==============================================================================
-- DAHANU DRY FISH - SUPABASE DATABASE & STORAGE SCHEMA
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_mr TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Categories" 
ON public.categories FOR SELECT 
USING (true);

-- Allow Insert/Update/Delete (Dashboard & Admin API)
CREATE POLICY "Admin Full Access Categories" 
ON public.categories FOR ALL 
USING (true)
WITH CHECK (true);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    local_name TEXT,
    name_mr TEXT,
    category TEXT REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL,
    image TEXT NOT NULL,
    badge TEXT,
    short_description TEXT,
    long_description TEXT,
    is_featured BOOLEAN DEFAULT false,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 10,
    weight_options JSONB NOT NULL DEFAULT '[]'::jsonb,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    culinary_use TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Products" 
ON public.products FOR SELECT 
USING (true);

-- Allow Insert/Update/Delete (Dashboard & Admin API)
CREATE POLICY "Admin Full Access Products" 
ON public.products FOR ALL 
USING (true)
WITH CHECK (true);

-- 3. Setup Supabase Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow Public Access to view product images
CREATE POLICY "Public Access Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow Upload/Modify Product Images
CREATE POLICY "Allow Image Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow Image Updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Allow Image Deletions"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- 4. Seed Default Categories
INSERT INTO public.categories (id, name, name_mr)
VALUES
    ('all', 'All Products', 'सर्व उत्पादने'),
    ('bombil', 'Bombil (Bombay Duck)', 'सुका बोंबील'),
    ('prawns', 'Prawns & Kolambi', 'सुकट आणि कोळंबी'),
    ('premium', 'Surmai & Premium Cuts', 'सुरमई आणि प्रीमियम कट्स'),
    ('daily', 'Bangda & Mandeli', 'बांगडा आणि मांदेली')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, name_mr = EXCLUDED.name_mr;

-- 5. Seed Initial Products (Sample 4 main items)
INSERT INTO public.products (
    id, name, local_name, name_mr, category, image, badge, 
    short_description, long_description, is_featured, rating, reviews_count,
    weight_options, highlights, culinary_use
)
VALUES
(
    'bombil-whole',
    'White Bombay Duck (Suvva Bombil)',
    'सुका पांढरा बोंबील',
    'सुका पांढरा बोंबील',
    'bombil',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
    'Best Seller',
    'Naturally sun-dried on coastal high machans. Snow-white, zero chemical smell, ultra-crispy texture.',
    'Harvested directly from Dahanu traditional bag-net fishing boats and immediately hung on bamboo machans (elevated drying racks) for 3 days of ocean-breeze drying. Retains maximum sea sweetness with zero chemical bleach or preservatives.',
    true,
    4.9,
    128,
    '[{"label": "250g", "price": 240}, {"label": "500g", "price": 450}, {"label": "1kg", "price": 850}]'::jsonb,
    '["100% Sun-dried on high bamboo machans (sand-free)", "Direct catch from Dahanu Koli fishermen", "Zero formalin, preservatives or artificial color", "Cleaned, head-trimmed & vacuum sealed"]'::jsonb,
    'Ideal for shallow crispy rava fry with garlic-chilli thecha, or authentic coastal dry bombil curry with steamed bhakri.'
),
(
    'sukat-red-prawns',
    'Baby Jawla & Red Sukat Prawns',
    'लाल सुकट / जवळा',
    'लाल सुकट / जवळा',
    'prawns',
    'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
    'Coastal Favourite',
    'Sweet micro prawns dried on coastal mats. Bursting with umami flavour, perfect for koli masalas.',
    'Tiny coastal prawns sun-dried right after landing. Cleaned through triple-sifting to eliminate sand particles. Rich in natural protein and intense seafood sweetness that flavours gravies instantly.',
    true,
    4.8,
    94,
    '[{"label": "250g", "price": 180}, {"label": "500g", "price": 340}, {"label": "1kg", "price": 650}]'::jsonb,
    '["Triple sifted for zero sand guarantee", "Naturally sweet aroma without foul odour", "Rich in natural protein, calcium and minerals", "Packed in resealable moisture-lock zip pouches"]'::jsonb,
    'Saute with caramelized onions, green chillies, garlic and fresh coconut for the legendary Sukat Chutney.'
),
(
    'surmai-dry-steaks',
    'Kingfish Surmai Dry Salted Steaks',
    'खारवलेली सुरमई',
    'खारवलेली सुरमई',
    'premium',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    'Premium Cut',
    'Thick, meaty bone-in steaks sea-salt cured and wind dried. Pure coastal royalty on your plate.',
    'Selected from large catch Kingfish (Surmai), precisely sliced into meaty steaks, lightly cured in sea salt crystals, and sun-cured under coastal afternoon sun. Dense, rich flaky meat.',
    true,
    5.0,
    62,
    '[{"label": "250g", "price": 380}, {"label": "500g", "price": 720}, {"label": "1kg", "price": 1380}]'::jsonb,
    '["Prime Kingfish surmai meaty steaks", "Light sea-salt curing preserves natural juiciness", "High protein density & heart-healthy Omega-3s", "Vacuum-sealed for 6+ months pantry life"]'::jsonb,
    'Soak in warm water for 15 mins to reduce salt, coat in Malvani spices and semolina, and shallow fry in coconut oil.'
),
(
    'bangda-salted',
    'Salt-Cured Indian Mackerel (Bangda)',
    'सुका खारवलेला बांगडा',
    'सुका खारवलेला बांगडा',
    'daily',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
    'Value Daily',
    'Full-sized oily mackerel split and sea-salt dried. Rich flavour, authentic village style preparation.',
    'Whole fresh Indian mackerels butterfly-split along the spine, gently cured with coarse sea salt and dried on coastal machans. Packed with Omega-3 healthy oils.',
    false,
    4.7,
    45,
    '[{"label": "500g (Approx 6-8 pcs)", "price": 280}, {"label": "1kg (Approx 12-16 pcs)", "price": 520}]'::jsonb,
    '["Naturally high Omega-3 fish oil content", "Butterfly cut cleaned inside out", "No chemical curing or artificial dehydrators", "Traditional Dahanu village recipe"]'::jsonb,
    'Roast directly over open charcoal or pan-fry with crushed black pepper, turmeric, and lemon juice.'
)
ON CONFLICT (id) DO NOTHING;

