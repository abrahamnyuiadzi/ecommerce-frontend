import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./navbar.css";

type Props = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({ search = "", setSearch }: Props) {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        Elinam Shop
      </Link>

      {/* RIGHT */}
      <div className="nav-right">

        {/* Search */}
        {setSearch && (
          <div className="search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="search"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch?.(e.target.value)}
            />
          </div>
        )}

        {/* Panier */}
        <Link to="/cart" className="cart-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>

        {/* Bouton Se connecter */}
        <Link to="/login" className="login-btn">
          Se connecter
        </Link>

      </div>
    </div>
  );
}
