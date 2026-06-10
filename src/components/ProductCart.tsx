import { Link } from "react-router-dom";
import type { Product } from "../types";
import "./product.css";

function StarRating({ rating = 4 }: { rating?: number }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`star ${i <= rating ? "" : "empty"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({
  product,
}: {
  product: Product & { oldPrice?: number; discount?: number; rating?: number };
}) {
  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="card">

        {/* Badge réduction */}
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}

        {/* Image */}
        <div className="image-box">
          <img
            src={`http://127.0.0.1:8000/storage/${product.image}`}
            alt={product.name}
          />
        </div>

        {/* Contenu */}
        <div className="card-content">

          <StarRating rating={product.rating ?? 4} />

          <h3>{product.name}</h3>

          <div className="price-row">
            <span className="price-current">{product.price} FCFA</span>
            {product.oldPrice && (
              <span className="price-old">{product.oldPrice} FCFA</span>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}
