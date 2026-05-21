import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import "./productDetail.css";

export default function ProductDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);

  const [selectedMedia, setSelectedMedia] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    api.get(`/products/${id}`)
      .then(res => {

        setProduct(res.data);

        // image par défaut
        setSelectedMedia(
          `http://127.0.0.1:8000/storage/${res.data.image}`
        );

      })
      .catch(err => console.log(err));

  }, [id]);

  // ACHAT
  const buyNow = () => {

    navigate("/checkout", {
      state: {
        product,
        quantity
      }
    });
  };

  if (!product) {
    return <p>Chargement...</p>;
  }

  // 🔥 galerie
  const gallery = [
    `http://127.0.0.1:8000/storage/${product.image}`,
     `http://127.0.0.1:8000/storage/${product.image}`,
     `http://127.0.0.1:8000/storage/${product.image}`
  ];

  return (
    <>
      <Navbar />

      <div className="product-detail">

        {/* LEFT */}
        <div className="left-section">

          {/* IMAGE PRINCIPALE */}
          <div className="main-media">

           {
  selectedMedia.includes(".mp4")
   ? (

    <video controls>

      <source
        src={selectedMedia}
        type="video/mp4"
      />

    </video>

  )
  : (

    <img
      loading="lazy"
      src={selectedMedia}
      alt={product.name}
    />

  )
}

          </div>

          {/* GALLERY */}
          <div className="gallery">

            {gallery.map((img, index) => (

              <img
                key={index}
                src={img}
                onClick={() =>
                  setSelectedMedia(img)
                }
              />

            ))}

            {/* VIDEO */}
          {
  product.video && (

    <video
    
      onClick={() =>
        setSelectedMedia(
          `http://127.0.0.1:8000/storage/${product.video}`
        )
      }
    >

      <source
        src={`http://127.0.0.1:8000/storage/${product.video}`}
        type="video/mp4"
      />

    </video>

  )
}

           

          </div>

        </div>

        {/* RIGHT */}
        <div className="right-section">

          <h1>{product.name}</h1>

          <div className="price">

            {product.price} FCFA

          </div>

          <p className="description">

            {product.description}

          </p>

          {/* STOCK */}
          <div className="stock">

            En stock

          </div>

          {/* QUANTITY */}
          <div className="quantity">

            <span>Quantité :</span>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
            />

          </div>

          {/* BUTTONS */}
          <div className="buttons">

            <button className="cart-btn">
              Ajouter au panier
            </button>

            <button
              className="buy-btn"
              onClick={buyNow}
            >
              Payer maintenant
            </button>

          </div>

        </div>

      </div>
    </>
  );
}