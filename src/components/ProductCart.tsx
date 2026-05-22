
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import "./product.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`}>
    <div className="card">
      <img src={`https://ecommerce-api-8cx4.onrender.com/${product.image}`} />

      <h3>{product.name}</h3>
       
      <p className="price">{product.price} FCFA</p>

      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
    </Link>
  );
}