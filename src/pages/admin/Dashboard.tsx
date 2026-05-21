import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0
  });

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(() => console.log("Erreur stats"));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <StatCard title="Produits" value={stats.products} />
        <StatCard title="Commandes" value={stats.orders} />
        <StatCard title="Revenus" value={stats.revenue + " FCFA"} />
      </div>
    </div>
  );
}