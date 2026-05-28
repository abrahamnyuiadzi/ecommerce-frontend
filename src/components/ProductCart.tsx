
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import "./product.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`}>
    <div className="card">
      <img src={`http://127.0.0.1:8000/storage/${product.image}`} />

      <h3>{product.name}</h3>
       
      <p className="price">{product.price} FCFA</p>

      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
    </Link>
  );
}