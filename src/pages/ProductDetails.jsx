import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import products from "../data/products";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export default function ProductDetails({ addToCart, wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-details-not-found">
          <h1>Product not found</h1>
          <p>This product may have been removed or the link may be incorrect.</p>
          <Link className="primary-button" to="/">Back to shopping</Link>
        </div>
      </main>
    );
  }

  const isWishlisted = wishlist.some((itemId) => String(itemId) === String(product.id));

  return (
    <main className="product-details-page">
      <button className="product-details-back" onClick={() => navigate(-1)} type="button">
        <ArrowLeft size={18} /> Back
      </button>

      <section className="product-details-layout">
        <div className="product-details-image-wrap">
          <img className="product-details-image" src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <span className="product-details-category">{product.category || "ShopEZ Collection"}</span>
          <h1>{product.name}</h1>
          <div className="product-details-rating">
            <Star size={18} fill="currentColor" />
            <span>{product.rating ?? "Not rated yet"}</span>
          </div>
          <p className="product-details-price">{money(product.price)}</p>
          {product.description ? (
            <p className="product-details-description">{product.description}</p>
          ) : (
            <p className="product-details-description">Explore this item from the ShopEZ collection. Product information is provided for demonstration purposes.</p>
          )}
          {product.badge && <span className="product-details-badge">{product.badge}</span>}

          <div className="product-details-actions">
            <button className="primary-button" type="button" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              className={`product-details-wishlist ${isWishlisted ? "active" : ""}`}
              type="button"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
          <p className="product-details-note">Demo store: prices, ratings, and availability are for demonstration only.</p>
        </div>
      </section>
    </main>
  );
}
