import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./navbar.css";


type Props = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({
  search = "",
  setSearch
}: Props) {

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (

    <div className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        Elinam Shop
      </Link>

      {/* SEARCH */}
     <div className="search-box">

  <input
    className="search"
    placeholder="Rechercher..."
    value={search}
    onChange={(e) =>
      setSearch?.(e.target.value)
    }
  />



</div>

      {/* RIGHT */}
      <div className="nav-right">

        <Link to="/cart">
          🛒 ({totalItems})
        </Link>

        <Link
          to="/login"
          className="profile"
        >
          👤
        </Link>

      </div>

    </div>
  );
}