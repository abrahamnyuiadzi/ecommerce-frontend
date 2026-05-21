import { useState } from "react";
import api from "../../api/axios";
import "./addProduct.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!image) {
      alert("Image obligatoire !");
      return;
    }

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("image", image);
    if (video) {
  data.append("video", video);
}

    try {
      await api.post("/products", data);
      alert("Produit ajouté !");
    } catch (err: any) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="add-product">

      <div className="form-card">
        <h2>Ajouter un produit</h2>

        <input 
          name ="name" 
          placeholder="Nom du produit" 
          onChange={handleChange} 
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Prix"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock (optionnel)"
          onChange={handleChange}
        />

        <input type="file" onChange={handleImage} />

        {/* PREVIEW IMAGE */}
        {preview && (
          <img src={preview} className="preview" />
        )}

        <input
          type="file"
          accept="video/*"
          onChange={(e: any) =>
            setVideo(e.target.files[0])
         }
        />
        {
  video && (

    <video
      width="200"
      controls
      style={{
        marginTop: "15px",
        borderRadius: "10px"
      }}
    >

      <source
        src={URL.createObjectURL(video)}
      />

    </video>

  )
}

        <button onClick={submit}>Ajouter produit</button>
      </div>

    </div>
  );
}