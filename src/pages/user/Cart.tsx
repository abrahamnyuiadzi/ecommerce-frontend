import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <Navbar />

      <div style={{ padding: 20 }}>
        <h1>Panier</h1>

        {cart.map(item => (
          <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
            <h3>{item.name}</h3>
            <p>{item.price} FCFA</p>
            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
          </div>
        ))}

        <h2>Total: {total} FCFA</h2>
      </div>
    </>
  );
}