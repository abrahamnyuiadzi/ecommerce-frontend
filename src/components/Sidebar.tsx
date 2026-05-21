import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {

      const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
  return (
    <div className="sidebar">
      <h2>Admin</h2>

      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/products">Produits</Link>
      <Link to="/admin/add-product">Ajouter</Link>
      <Link to="/admin/orders">Commandes</Link>
        <button onClick={logout} style={{ marginTop: 20 }}>
            Logout
        </button>
    </div>

    
  );
}