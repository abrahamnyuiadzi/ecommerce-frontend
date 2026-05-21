import { useEffect, useState } from "react";
import api from "../../api/axios";

import { Link } from "react-router-dom";
import type { Product } from "../../types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    api.get("/products").then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("Supprimer ?")) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Produits</h2>

      {products.map(p => (
        <div key={p.id} style={{ background: "white", margin: 10, padding: 10 }}>
       
          <h3>{p.name}</h3>
          <p>{p.price} FCFA</p>

          <Link to={`/admin/edit-product/${p.id}`}>Modifier</Link>
          <button onClick={() => deleteProduct(p.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}