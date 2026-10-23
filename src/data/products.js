const baseProducts = [
  {
    id: 1,
    name: "Samsung Galaxy Smartphone",
    category: "Electronics",
    price: 14999,
    originalPrice: 18999,
    rating: 4.4,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    description:
      "Enjoy a vibrant display, excellent performance, and a powerful camera with this smartphone.",
    brand: "Samsung",
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    originalPrice: 2999,
    rating: 4.2,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description:
      "Experience immersive sound, comfortable ear cushions, and wireless listening.",
    brand: "Audio Pro",
    inStock: true,
  },
  {
    id: 3,
    name: "Running Sports Shoes",
    category: "Fashion",
    price: 1999,
    originalPrice: 3499,
    rating: 4.3,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description:
      "Lightweight sports shoes designed for comfortable everyday walking and running.",
    brand: "SportMax",
    inStock: true,
  },
  {
    id: 4,
    name: "Classic Wrist Watch",
    category: "Fashion",
    price: 2499,
    originalPrice: 3999,
    rating: 4.1,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description:
      "A stylish wristwatch suitable for casual outfits, office wear, and special occasions.",
    brand: "TimeStyle",
    inStock: true,
  },
  {
    id: 5,
    name: "Modern Backpack",
    category: "Accessories",
    price: 999,
    originalPrice: 1599,
    rating: 4.2,
    reviews: 350,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    description:
      "A versatile backpack with useful storage space for travel, college, and everyday use.",
    brand: "TravelPro",
    inStock: true,
  },
  {
    id: 6,
    name: "Modern Lounge Chair",
    category: "Home",
    price: 5999,
    originalPrice: 7999,
    rating: 4.5,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
    description:
      "A contemporary furniture piece designed to complement modern living spaces.",
    brand: "HomeStyle",
    inStock: true,
  },
  {
    id: 7,
    name: "Premium Digital Camera",
    category: "Electronics",
    price: 24999,
    originalPrice: 29999,
    rating: 4.6,
    reviews: 230,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    description:
      "Capture everyday moments with a dedicated digital camera designed for photography enthusiasts.",
    brand: "PixelPro",
    inStock: true,
  },
  {
    id: 8,
    name: "Casual Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    originalPrice: 899,
    rating: 4.0,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    description:
      "A versatile casual T-shirt suitable for everyday wear and relaxed outings.",
    brand: "UrbanWear",
    inStock: true,
  },
  {
    id: 9,
    name: "Ceramic Coffee Mug Set",
    category: "Home",
    price: 599,
    originalPrice: 999,
    rating: 4.3,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    description:
      "A stylish ceramic mug set for enjoying coffee, tea, and other hot beverages.",
    brand: "HomeStyle",
    inStock: true,
  },
  {
    id: 10,
    name: "Laptop for Everyday Work",
    category: "Electronics",
    price: 45999,
    originalPrice: 52999,
    rating: 4.5,
    reviews: 760,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    description:
      "A laptop concept for everyday productivity, studying, browsing, and office tasks.",
    brand: "TechPro",
    inStock: true,
  },
];

// Generate 120 separate demo product records.
// Replace these generated variations with genuine product data before launch.
const products = Array.from({ length: 120 }, (_, index) => {
  const base = baseProducts[index % baseProducts.length];

  return {
    ...base,
    id: index + 1,
    name:
      index < baseProducts.length
        ? base.name
        : `${base.name} - Edition ${Math.floor(index / baseProducts.length) + 1}`,
  };
});

export default products;
