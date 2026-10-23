import { useEffect, useMemo, useState } from "react";
import products from "./data/products";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import {
ShoppingCart,
Search,
Heart,
Menu,
X,
Plus,
Minus,
Trash2,
ArrowRight,
Star,
Package,
ShieldCheck,
Truck,
Headphones,
ShoppingBag,
}

from "lucide-react";


import "./index.css";



const categories = [
"All Products",
"Electronics",
"Fashion",
"Accessories",
];

const money = (amount) =>
new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 0,
}).format(amount);

function readStorage(key, fallback) {
try {
const saved = localStorage.getItem(key);
return saved ? JSON.parse(saved) : fallback;
} catch {
return fallback;
}
}

function App() {
  const navigate = useNavigate();

const openProduct = (product) => {
  navigate(`/product/${product.id}`);
};
const [cart, setCart] = useState(() =>
readStorage("shopez-cart", [])
);

const [wishlist, setWishlist] = useState(() =>
readStorage("shopez-wishlist", [])
);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All Products");
const [sort, setSort] = useState("featured");
const [cartOpen, setCartOpen] = useState(false);
const [mobileMenu, setMobileMenu] = useState(false);
const [notice, setNotice] = useState("");
const [wishlistOnly, setWishlistOnly] = useState(false);

useEffect(() => {
localStorage.setItem("shopez-cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
localStorage.setItem(
"shopez-wishlist",
JSON.stringify(wishlist)
);
}, [wishlist]);

useEffect(() => {
if (!notice) return;


const timer = setTimeout(() => setNotice(""), 2500);
return () => clearTimeout(timer);


}, [notice]);

const filteredProducts = useMemo(() => {
  let result = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.description || "").toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All Products" || product.category === category;

    const matchesWishlist =
      !wishlistOnly || wishlist.includes(product.id);

    return matchesSearch && matchesCategory && matchesWishlist;
  });

  if (sort === "low") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    result = [...result].sort((a, b) => b.rating - a.rating);
  }

  return result;
}, [search, category, sort, wishlistOnly, wishlist]);

const cartCount = cart.reduce(
(total, item) => total + item.quantity,
0
);

const subtotal = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
);

function addToCart(product) {
setCart((current) => {
const existing = current.find(
(item) => item.id === product.id
);


  if (existing) {
    return current.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...current, { ...product, quantity: 1 }];
});

setNotice(`${product.name} added to your cart!`);


}

function changeQuantity(id, amount) {
setCart((current) =>
current
.map((item) =>
item.id === id
? { ...item, quantity: item.quantity + amount }
: item
)
.filter((item) => item.quantity > 0)
);
}

function removeFromCart(id) {
setCart((current) =>
current.filter((item) => item.id !== id)
);
setNotice("Product removed from cart.");
}

function toggleWishlist(id) {
const exists = wishlist.includes(id);


setWishlist((current) =>
  exists
    ? current.filter((itemId) => itemId !== id)
    : [...current, id]
);

setNotice(
  exists ? "Removed from wishlist." : "Added to wishlist!"
);


}

function handleCheckout() {
setNotice(
"Demo checkout only. Connect a backend and payment provider to accept orders."
);
}

const homePage = ( <div className="app-shell"> <div className="announcement">
✨ Welcome to ShopEZ — Find your favorites at great prices! </div>


  <header className="header">
    <a href="#home" className="logo">
      <span className="logo-icon">
        <ShoppingBag size={24} />
      </span>
      Shop<span>EZ</span>
    </a>

    <nav className={`nav-links ${mobileMenu ? "nav-open" : ""}`}>
      <a href="#home" onClick={() => setMobileMenu(false)}>
        Home
      </a>
      <a
        href="#products"
        onClick={() => setMobileMenu(false)}
      >
        Shop
      </a>
      <a
        href="#services"
        onClick={() => setMobileMenu(false)}
      >
        Why ShopEZ
      </a>
      <button
        type="button"
        className="nav-login-button"
        onClick={() => { setMobileMenu(false); navigate("/login"); }}
      >
        Sign in / Login
      </button>
    </nav>

    <div className="header-actions">
      <button
        className={`icon-button wishlist-header ${
          wishlistOnly ? "active" : ""
        }`}
        aria-label="Show wishlist products"
        onClick={() => {
          setWishlistOnly((value) => !value);
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <Heart size={21} />
        {wishlist.length > 0 && (
          <span className="count-badge">
            {wishlist.length}
          </span>
        )}
      </button>

      <button
        className="cart-button"
        onClick={() => setCartOpen(true)}
        aria-label="Open shopping cart"
      >
        <ShoppingCart size={20} />
        <span>Cart</span>
        <span className="cart-count">{cartCount}</span>
      </button>

      <button
        className="icon-button menu-button"
        onClick={() => setMobileMenu((value) => !value)}
        aria-label="Toggle menu"
      >
        {mobileMenu ? <X /> : <Menu />}
      </button>
    </div>
  </header>

  <main>
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">
          YOUR EVERYDAY SHOPPING DESTINATION
        </span>

        <h1>
          Shop Smart.
          <br />
          Live <span>Better.</span>
        </h1>

        <p>
          Discover products you love at prices you'll love even
          more. Make every shopping experience simple and
          enjoyable with ShopEZ.
        </p>

        <div className="hero-actions">
          <a href="#products" className="primary-button">
            Explore Products <ArrowRight size={19} />
          </a>

          <span className="hero-note">
            Great finds. Great prices.
          </span>
        </div>

        <div className="hero-stats">
          
          
          <div>
            <strong>24/7</strong>
            <span>Shop online</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
       <img
  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
  alt="ShopEZ Online Shopping"
  className="w-full h-full object-cover"
/>

        <div className="floating-card">
          <div className="floating-icon">
            <Package size={23} />
          </div>
          <div>
            <strong>Your next favorite</strong>
            <span>Discover something new</span>
          </div>
        </div>
      </div>
    </section>

    <section className="services" id="services">
      <div className="service-item">
        <Truck size={27} />
        <div>
          <strong>Convenient Shopping</strong>
          <span>Browse from anywhere</span>
        </div>
      </div>

      <div className="service-item">
        <ShieldCheck size={27} />
        <div>
          <strong>Shop with Confidence</strong>
          <span>Clear product information</span>
        </div>
      </div>

      <div className="service-item">
        <Headphones size={27} />
        <div>
          <strong>Customer First</strong>
          <span>Built around your needs</span>
        </div>
      </div>
    </section>

    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <span className="eyebrow">OUR COLLECTION</span>
          <h2>
            Discover Our <span>Products</span>
          </h2>
          <p>
            Find your next favorite from our curated collection.
          </p>
        </div>

        <div className="result-count">
          {filteredProducts.length} products
        </div>
      </div>

      <div className="product-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search products"
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "category active" : "category"
              }
              onClick={() => {
                setCategory(item);
                setWishlistOnly(false);
              }}
            >
              {item}
            </button>
          ))}

          {wishlistOnly && (
            <button
              className="category active"
              onClick={() => setWishlistOnly(false)}
            >
              Wishlist <X size={15} />
            </button>
          )}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article
              className="product-card clickable-product"
              key={product.id}
              role="link"
              tabIndex={0}
              onClick={() => openProduct(product)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProduct(product);
                }
              }}
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                {product.badge && (
                  <span className="product-badge">
                    {product.badge}
                  </span>
                )}

                <button
                  className={`wishlist-button ${
                    wishlist.includes(product.id)
                      ? "wishlisted"
                      : ""
                  }`}
                  onClick={(event) => { event.stopPropagation(); toggleWishlist(product.id); }}
                  aria-label={`${
                    wishlist.includes(product.id)
                      ? "Remove"
                      : "Add"
                  } ${product.name} ${
                    wishlist.includes(product.id)
                      ? "from"
                      : "to"
                  } wishlist`}
                >
                  <Heart
                    size={19}
                    fill={
                      wishlist.includes(product.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              <div className="product-info">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="product-description">
                  {product.description}
                </p>

                <div className="rating">
                  <Star
                    size={16}
                    fill="currentColor"
                  />
                  <span>{product.rating}</span>
                  <span className="rating-label">
                    Customer rating
                  </span>
                </div>

                <div className="product-bottom">
                  <div className="price-container">
                    <strong>{money(product.price)}</strong>
                    <del>{money(product.oldPrice)}</del>
                  </div>

                  <button
                    className="add-button"
                    onClick={(event) => { event.stopPropagation(); addToCart(product); }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart size={19} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-products">
          <Search size={36} />
          <h3>No products found</h3>
          <p>
            Try a different search term or choose another
            category.
          </p>
          <button
            className="primary-button"
            onClick={() => {
              setSearch("");
              setCategory("All Products");
              setWishlistOnly(false);
            }}
          >
            View all products
          </button>
        </div>
      )}
    </section>

    <section className="newsletter">
      <div>
        <span className="eyebrow">STAY IN THE LOOP</span>
        <h2>Shopping made simple.</h2>
        <p>
          Explore our collection and find something you love.
        </p>
      </div>
      <a href="#products" className="newsletter-button">
        Start Shopping <ArrowRight size={18} />
      </a>
    </section>
  </main>

  <footer className="footer">
    <a href="#home" className="logo footer-logo">
      <span className="logo-icon">
        <ShoppingBag size={22} />
      </span>
      Shop<span>EZ</span>
    </a>

    <div className="footer-copy">
      <p>
        Your everyday shopping destination.
        <br />
        © {new Date().getFullYear()} ShopEZ. All rights reserved.
      </p>
      <div className="footer-disclaimer">
        <strong>About this demonstration</strong>
        <p>ShopEZ is an educational e-commerce demonstration project. Some product images, descriptions, and other content may be sourced from publicly available online resources.</p>
        <p>All trademarks, product names, and images belong to their respective owners. ShopEZ is not affiliated with or endorsed by the brands displayed. Prices, ratings, and availability are for demonstration purposes only.</p>
      </div>
    </div>

    <a href="#home" className="back-to-top">
      Back to top ↑
    </a>
  </footer>

  {notice && (
    <div className="toast" role="status">
      {notice}
    </div>
  )}

  {cartOpen && (
    <div
      className="drawer-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setCartOpen(false);
        }
      }}
    >
      <aside
        className="cart-drawer"
        aria-label="Shopping cart"
      >
        <div className="drawer-header">
          <div>
            <h2>Your Cart</h2>
            <span>
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            className="icon-button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={23} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={38} />
            </div>
            <h3>Your cart is empty</h3>
            <p>
              Looks like you haven't added anything yet.
            </p>
            <button
              className="primary-button"
              onClick={() => {
                setCartOpen(false);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <strong>{money(item.price)}</strong>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <div className="summary-line">
                <span>Shipping</span>
                <strong>Calculated at checkout</strong>
              </div>

              <div className="summary-line total-line">
                <span>Estimated total</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <button
                className="checkout-button"
                onClick={handleCheckout}
              >
                Continue to Checkout <ArrowRight size={19} />
              </button>

              <p className="checkout-note">
                Demo storefront — no real payment is collected.
              </p>
            </div>
            
          </>
        )}
      </aside>
    </div>
  )}
</div>
);

  return (
    <Routes>
      <Route path="/" element={homePage} />
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={homePage} />
    </Routes>
  );
}

export default App;
