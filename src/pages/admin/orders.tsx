import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = () => {
    api.get("/orders").then(res => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h1>Commandes</h1>

      {orders.map(order => (
        <div key={order.id} className="order-card">

          <h3>Commande #{order.id}</h3>

          <p><strong>Total:</strong> {order.total} FCFA</p>
          <p><strong>Téléphone:</strong> {order.phone}</p>
          <p><strong>Adresse:</strong> {order.address}</p>

          {/* STATUS */}
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
          >
            <option value="pending">En attente</option>
            <option value="paid">Payé</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
          </select>

          {/* PRODUITS */}
          <div>
            <h4>Produits :</h4>

            {order.items.map((item: any) => (
              <div key={item.id}>
                <p>{item.product.name}</p>
                <p>Quantité: {item.quantity}</p>
              </div>
            ))}

          </div>

        </div>
      ))}
    </div>
  );
}