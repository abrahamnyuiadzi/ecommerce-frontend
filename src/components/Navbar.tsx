import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./navbar.css";

export default function Navbar() {
  const { cart } = useCart();

  // const token = localStorage.getItem("token");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <Link to="/" className="logo">Elinam Shop</Link>

      <input className="search" placeholder="Rechercher..." />

      <div className="nav-right">
        <Link to="/cart">🛒 ({totalItems})</Link>

    <Link to="/login" className="profile">
  👤
</Link>
      </div>
    </div>
  );
}