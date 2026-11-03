export const categories = [
  { id: "all", name: "All Products" },
  { id: "bombil", name: "Bombil (Bombay Duck)" },
  { id: "prawns", name: "Prawns & Kolambi" },
  { id: "premium", name: "Surmai & Premium Cuts" },
  { id: "daily", name: "Bangda & Mandeli" },
];

export const products = [
  {
    id: "dry-bombil",
    name: "Dry Bombil",
    localName: "सुका बोंबील (Bombay Duck)",
    category: "bombil",
    shortDescription:
      "Signature coastal Bombay Duck, naturally sun-dried on traditional sea-breeze scaffolds. Crisp texture with rich umami flavour.",
    longDescription:
      "Dahanu's famous Sun-Dried Bombil is prepared following generations-old coastal methods. Caught fresh off the Arabian Sea, gently salted and hung on traditional bamboo frames (machans) to dry under the pure coastal sun and sea breeze. Golden-amber in hue, bone-dry yet tender inside when cooked, perfect for crispy rava fry, spicy Bombil masala, or authentic coastal thecha.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 148,
    weightOptions: [
      { label: "250g", price: 220 },
      { label: "500g", price: 400 },
      { label: "1kg", price: 750 },
    ],
    highlights: [
      "Naturally dried on bamboo machans",
      "No chemical preservatives or artificial bleach",
      "Authentic Dahanu coastal catch",
      "Hygienically cleaned and head-trimmed",
    ],
    culinaryUse: "Best for crispy fry, Koli style curry, or dry spicy chutney (thecha).",
  },
  {
    id: "dry-prawns",
    name: "Dry Prawns (Medium Sukha Jhinga)",
    localName: "सुकट / सुका झिंगा (Medium Prawns)",
    category: "prawns",
    shortDescription:
      "Sweet, savoury sun-dried coastal prawns. Peeled and cleaned with maximum natural sweetness and intense seafood aroma.",
    longDescription:
      "Medium-sized succulent prawns harvested from Dahanu's intertidal waters, deshelled and naturally solar-dried. These prawns retain their natural pink-orange hue, tender bite, and concentrated maritime sweetness without being overly salty. A staple in coastal Maharashtrian and Konkani households.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80",
    badge: "Most Popular",
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 182,
    weightOptions: [
      { label: "250g", price: 320 },
      { label: "500g", price: 600 },
      { label: "1kg", price: 1150 },
    ],
    highlights: [
      "100% shell-free, ready to cook",
      "Sun-dried to retain natural sweetness",
      "Rich in protein & healthy omega fatty acids",
      "Vacuum-sealed for lasting freshness",
    ],
    culinaryUse: "Ideal for Sukat Bhaji with onions & green chillies, Prawn Pulao, or ground chutney.",
  },
  {
    id: "dry-surmai",
    name: "Dry Surmai (King Fish Steaks)",
    localName: "सुकी सुरमई (Kingfish)",
    category: "premium",
    shortDescription:
      "Thick, meaty cuts of prime Arabian Sea Kingfish. Lightly sea-salted and cured under coastal sun for rich, decadent taste.",
    longDescription:
      "Surmai (Kingfish) is the crowned royalty of sea fish. Our dry Surmai steaks are sliced from freshly caught, prime-grade fish, cured with pure sea salt, and air-dried carefully. The meat remains dense, flaky, and intensely flavorful. Once soaked in warm water, it reconstitutes wonderfully for authentic coastal curries.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    badge: "Premium Cut",
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 94,
    weightOptions: [
      { label: "250g", price: 380 },
      { label: "500g", price: 720 },
      { label: "1kg", price: 1380 },
    ],
    highlights: [
      "Meaty, boneless/center-bone prime fillets",
      "Traditional sea-salt preservation only",
      "Rehydrates quickly with firm texture",
      "Delivered in food-grade multi-layer pouch",
    ],
    culinaryUse: "Rehydrate for 15 mins, shallow fry in spiced coconut oil, or add to tangy tamarind curry.",
  },
  {
    id: "dry-bangda",
    name: "Dry Bangda (Mackerel)",
    localName: "सुका बांगडा (Salt-Cured Mackerel)",
    category: "daily",
    shortDescription:
      "Whole butterflied Dahanu Mackerels, cured with natural rock salt. Robust, deep ocean flavor with satisfying tender flakes.",
    longDescription:
      "Bangda is treasured for its rich omega-3 oils and bold flavour. Freshly caught mackerels are butterflied down the spine, thoroughly washed in clean sea brine, and sun-dried on clean net platforms. The result is a savory, firm fish that brings warmth and rustic coastal nostalgia to your dining table.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    badge: "Traditional Pick",
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 110,
    weightOptions: [
      { label: "250g", price: 190 },
      { label: "500g", price: 350 },
      { label: "1kg", price: 680 },
    ],
    highlights: [
      "Whole butterflied fish, cleaned meticulously",
      "Traditional brine curing",
      "High natural oil content for juicy texture",
      "Authentic coastal village preparation",
    ],
    culinaryUse: "Roast over open flame, shallow fry with red chili masala, or cook in raw mango coconut curry.",
  },
  {
    id: "dry-mandeli",
    name: "Dry Mandeli (Golden Anchovy)",
    localName: "सुकी मांदेली (Golden Anchovies)",
    category: "daily",
    shortDescription:
      "Delicate little golden anchovies, sun-crisped to perfection. Crunchy, calcium-rich, and deeply savory with every bite.",
    longDescription:
      "Dahanu's shallow coastal waters yield the finest small Mandeli (Golden Anchovy). Gently rinsed and dried whole, these small fish become irresistibly crisp when tossed in a pan. They are an exceptional source of natural calcium and phosphorus, beloved across generations.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
    badge: "Crispy Crunch",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 76,
    weightOptions: [
      { label: "250g", price: 180 },
      { label: "500g", price: 330 },
      { label: "1kg", price: 620 },
    ],
    highlights: [
      "Whole small fish, edible bones loaded with calcium",
      "Crisp sun-dry finish",
      "No bitterness, cleanly processed",
      "Great accompaniment with rice and dal",
    ],
    culinaryUse: "Quick pan fry with turmeric, chili powder and a dash of lemon juice for an irresistible side dish.",
  },
  {
    id: "dry-kolambi",
    name: "Dry Tiny Kolambi (Karandi / Baby Shrimps)",
    localName: "सुकी बारीक कोळंबी / करंदी (Baby Shrimps)",
    category: "prawns",
    shortDescription:
      "Miniature coastal baby shrimps with an explosion of rich seafood flavor. The secret soul of authentic coastal chutneys.",
    longDescription:
      "Tiny Kolambi (also known as Karandi or Jawla) is a coastal delicacy. Harvested in the early morning nets, carefully sifted, and sun-dried on clean coastal mats. It lends an unmistakable depth of flavor to simple stir-fries, khichdi, and roasted garlic-chilli dry chutneys.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    badge: "Chutney Special",
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 124,
    weightOptions: [
      { label: "250g", price: 210 },
      { label: "500g", price: 390 },
      { label: "1kg", price: 740 },
    ],
    highlights: [
      "Sifted multiple times to remove sand and grit",
      "Natural sun-dried sweetness",
      "Essential ingredient for coastal dry chutneys",
      "Airtight vacuum moisture barrier",
    ],
    culinaryUse: "Dry roast and grind with roasted coconut, garlic and dry red chillies for legendary Karandi Chutney.",
  },
  {
    id: "dry-paplet",
    name: "Dry White Pomfret (Paplet)",
    localName: "सुका पापलेट (White Pomfret)",
    category: "premium",
    shortDescription:
      "Prized whole white pomfret, delicately salted and sun-cured. Melt-in-mouth flaky white fish with refined sweetness.",
    longDescription:
      "White Pomfret from the pristine coastal waters of Dahanu, butterflied, lightly treated with pure sea salt, and solar-dried to perfection. A luxurious dry seafood experience with minimal bones and delicate flesh.",
    image: "https://images.unsplash.com/photo-1510130387422-82ebd332a64e?auto=format&fit=crop&w=900&q=80",
    badge: "Chef's Selection",
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 62,
    weightOptions: [
      { label: "250g", price: 450 },
      { label: "500g", price: 850 },
      { label: "1kg", price: 1600 },
    ],
    highlights: [
      "Premium table-grade White Pomfret",
      "Delicate sea salt cure",
      "Soft flakes when rehydrated",
      "Guaranteed premium export grade",
    ],
    culinaryUse: "Shallow fry with semolina coating or slow-simmer in thick Konkani coconut gravy.",
  },
  {
    id: "dry-rawas",
    name: "Dry Rawas (Indian Salmon)",
    localName: "सुका रावस (Indian Salmon)",
    category: "premium",
    shortDescription:
      "Thick boneless dry fillets of Indian Salmon. Rich healthy fats, gentle salinity, and hearty meaty texture.",
    longDescription:
      "Rawas is celebrated for its natural succulence and mild flavor. Our sun-dried Rawas steaks are hand-selected, cleaned, and slowly dehydrated in clean coastal air to preserve its rich healthy oils and tender protein structure.",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
    badge: "High Omega-3",
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 51,
    weightOptions: [
      { label: "250g", price: 420 },
      { label: "500g", price: 790 },
      { label: "1kg", price: 1500 },
    ],
    highlights: [
      "Boneless, dense protein-rich steaks",
      "Zero chemicals, pure coastal salt",
      "Hygienically packaged with oxygen absorber",
      "Excellent shelf life",
    ],
    culinaryUse: "Pan fry with ginger-garlic paste and lemon or prepare spicy tomato-onion coastal gravy.",
  },
];

export const whyChooseUsData = [
  {
    id: "authentic",
    title: "Authentic Dahanu Products",
    description:
      "Sourced directly from Dahanu's indigenous Koli fishermen who have perfected coastal seafood drying over centuries.",
    icon: "ShieldCheck",
  },
  {
    id: "traditional",
    title: "Traditional Sun-Drying Taste",
    description:
      "Sun-dried naturally on elevated bamboo machans under pure Arabian Sea breeze — zero industrial chemicals or artificial preservatives.",
    icon: "Sun",
  },
  {
    id: "selected",
    title: "Carefully Selected Catch",
    description:
      "Every single batch is hand-sorted, graded, and inspected to ensure only the firmest, freshest catch makes it to your package.",
    icon: "Fish",
  },
  {
    id: "hygienic",
    title: "Hygienically Packed",
    description:
      "Vacuum-sealed in food-grade multi-layer pouches to seal in aroma, lock out moisture, and deliver odor-free fresh fish to your doorstep.",
    icon: "PackageCheck",
  },
];

export const storyMilestones = [
  {
    step: "01",
    title: "Dawn on Dahanu's Coastline",
    subtitle: "The Morning Catch",
    description:
      "Long before dawn, local Koli fishermen set sail into the Arabian Sea from Dahanu's historic beaches. Only prime morning catches are brought ashore for drying.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "02",
    title: "Artisanal Sorting & Cleaning",
    subtitle: "Respecting the Produce",
    description:
      "Within hours of landing, fish are cleaned meticulously with purified sea water brine, de-veined, and graded by senior fisherwomen with decades of tactile expertise.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "03",
    title: "Elevated Bamboo Machans",
    subtitle: "Sun, Wind & Sea Salt",
    description:
      "Never dried on the ground or exposed to dust. Products are hung high on bamboo scaffolds facing the Arabian Sea winds, soaking in bright tropical sunshine.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    step: "04",
    title: "Hygienic Modern Packaging",
    subtitle: "Straight To Your Kitchen",
    description:
      "Cleaned, final-checked, and sealed in multi-barrier vacuum packs. Delivered to Mumbai, Pune, and all across India ready to cook in your kitchen.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
];

export const testimonials = [
  {
    name: "Sunita Raut",
    city: "Dadar, Mumbai",
    quote:
      "Ordering through WhatsApp was so quick and effortless! The dry Bombil was so clean, completely free from sand, and fried up wonderfully crispy. Reminds me of my grandmother's home cooking in Alibaug.",
    rating: 5,
    product: "Dry Bombil (500g)",
  },
  {
    name: "Ketan Patil",
    city: "Kothrud, Pune",
    quote:
      "I ordered 1kg of Dry Sukat Prawns. The quality is exceptional — pinkish, sweet aroma, perfectly dried with zero stink. The WhatsApp response was within 5 minutes and delivery arrived safely in Pune within 2 days.",
    rating: 5,
    product: "Dry Prawns (1kg)",
  },
  {
    name: "Dr. Aniruddha Kulkarni",
    city: "Thane West",
    quote:
      "Finding authentic, hygienic dry Surmai in the city is rare. Dahanu Dry Fish's packaging is top-notch — vacuum sealed with zero smell in courier. Their WhatsApp customer care answered all my preparation questions promptly.",
    rating: 5,
    product: "Dry Surmai (500g)",
  },
  {
    name: "Meenakshi Bhandari",
    city: "Nashik",
    quote:
      "The Karandi baby shrimp chutney I made using their dry kolambi was extraordinary! You can immediately smell the difference when fish is dried cleanly under coastal sea breeze rather than market stalls.",
    rating: 5,
    product: "Dry Tiny Kolambi (500g)",
  },
];

export const instagramGallery = [
  {
    id: 1,
    caption: "Golden sun-dried Bombil hung high on Dahanu's coastal machans ☀️🌊",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    likes: "420",
    tag: "#AuthenticDahanu",
  },
  {
    id: 2,
    caption: "Crispy fried Sukha Bombil with fresh green coriander thecha for Sunday lunch!",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    likes: "612",
    tag: "#KoliCuisine",
  },
  {
    id: 3,
    caption: "Fresh morning catch brought in by traditional fishing boats at Dahanu harbor.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    likes: "389",
    tag: "#CoastalLife",
  },
  {
    id: 4,
    caption: "Sweet sun-dried prawns sorted and vacuum-sealed for safe courier delivery nationwide.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    likes: "530",
    tag: "#HygienicDryFish",
  },
  {
    id: 5,
    caption: "Rustic coastal flavours in your modern kitchen — simple, honest, traditional.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    likes: "348",
    tag: "#DahanuFlavours",
  },
  {
    id: 6,
    caption: "Sunset at Dahanu Beach — the historic coast where our seafood heritage began.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    likes: "782",
    tag: "#DahanuCoast",
  },
];

