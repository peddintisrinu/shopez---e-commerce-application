export default function ProductCard({ product, onClick }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => onClick(product)}
        style={{ cursor: "pointer", width: "100%" }}
      />

      <h3 onClick={() => onClick(product)}>
        {product.name}
      </h3>

      <p>⭐ {product.rating}</p>

      <p>₹{product.price.toLocaleString("en-IN")}</p>

      <button onClick={() => onClick(product)}>
        View Details
      </button>
    </div>
  );
}
