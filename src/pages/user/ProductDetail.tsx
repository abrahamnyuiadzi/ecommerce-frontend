import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import "./productDetail.css";

function StarRating({ rating = 3 }: { rating?: number }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`star ${i <= rating ? "" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedMedia(`http://127.0.0.1:8000/storage/${res.data.image}`);
      })
      .catch(err => console.log(err));
  }, [id]);

  const buyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

  if (!product) return <p>Chargement...</p>;

  const gallery = [
    `http://127.0.0.1:8000/storage/${product.image}`,
  ];

  return (
    <>
      <Navbar />

      <div className="product-detail">

        {/* ── LEFT ── */}
        <div className="left-section">

          {/* Image principale */}
          <div className="main-media">
            {selectedMedia.includes(".mp4") ? (
              <video controls>
                <source src={selectedMedia} type="video/mp4" />
              </video>
            ) : (
              <img loading="lazy" src={selectedMedia} alt={product.name} />
            )}
          </div>

          {/* Galerie miniatures */}
          <div className="gallery">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                className={selectedMedia === img ? "active" : ""}
                onClick={() => setSelectedMedia(img)}
              />
            ))}

            {product.video && (
              <video
                className={
                  selectedMedia ===
                  `http://127.0.0.1:8000/storage/${product.video}`
                    ? "active"
                    : ""
                }
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
            )}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right-section">

          {/* Catégorie */}
          {product.category && (
            <p className="product-category">{product.category}</p>
          )}

          {/* Titre */}
          <h1>{product.name}</h1>

          {/* Description */}
          <p className="description">{product.description}</p>

          {/* Rating */}
          <div className="rating-row">
            <StarRating rating={product.rating ?? 3} />
            <span className="review-count">
              ({product.reviews ?? 0} Reviews)
            </span>
          </div>

          <hr className="divider" />

          {/* Prix */}
          <div className="price-row">
            <span className="price">{product.price} FCFA</span>
            {product.oldPrice && (
              <>
                <span className="price-old">{product.oldPrice} FCFA</span>
                <span className="discount-label">
                  Promotion ce weekend seulement
                </span>
              </>
            )}
          </div>

          <hr className="divider" />

          {/* Stock */}
          <div className="stock">
            {product.stock <= 10
              ? `Plus que ${product.stock} articles — commandez vite !`
              : "En stock"}
          </div>

          {/* Quantité avec - / + */}
          <div className="quantity">
            <button
              className="qty-btn"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="qty-btn"
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          {/* Boutons */}
          <div className="buttons">
            <button className="buy-btn" onClick={buyNow}>
              Envoyer un message 
            </button>
            <button className="cart-btn">
              Ajouter au panier
            </button>
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <div className="feature-text">
                <strong>Livraison gratuite</strong>
                <span>Service de livraison offert à l'achat</span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💳</span>
              <div className="feature-text">
                <strong>Paiement sécurisé</strong>
                <span>Transactions 100% sécurisées</span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🕐</span>
              <div className="feature-text">
                <strong>Support 24/7</strong>
                <span>Notre équipe est disponible à tout moment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
