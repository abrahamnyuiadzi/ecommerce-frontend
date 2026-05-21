import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function EditProduct() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setName(res.data.name);
      setPrice(res.data.price);
    });
  }, []);

  const update = async () => {
    await api.put(`/products/${id}`, {
      name,
      price: Number(price)
    });

    alert("Mis à jour !");
  };

  return (
    <div>
      <h2>Modifier produit</h2>

        <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        />
        <input
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
          />

      <button onClick={update}>Sauvegarder</button>
    </div>
  );
}