import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./checkout.css";
import { QRCodeCanvas } from "qrcode.react";

export default function Checkout() {

  const location = useLocation();

  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Aucun produit sélectionné</h2>
      </div>
    );
  }

  const total = Number(product.price) * Number(quantity);

  // ✅ NUMÉRO UNIQUE pour le paiement
  const paymentNumber = "22896442607";

  // ✅ WHATSAPP
  const confirmPayment = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setSubmitted(true);
      return;
    }

    const adminNumber = "22896442607";

    const message = `
Nouvelle commande

Produit: ${product.name}

Quantité: ${quantity}

Total: ${total} FCFA

Nom: ${name}

Téléphone: ${phone}

Adresse: ${address}
`;

    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="checkout">
      <div className="checkout-card">

        <h2>Paiement</h2>

        {/* PRODUIT */}
        <div className="product">
          <img
            src={`http://127.0.0.1:8000/storage/${product.image}`}
            alt={product.name}
          />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>Prix : {product.price} FCFA</p>
            <p>Quantité : {quantity}</p>
          </div>
        </div>

        {/* TOTAL */}
        <div className="total">
          Total : {total} FCFA
        </div>

        {/* FORMULAIRE */}
        <input
          type="text"
          placeholder="Votre nom *"
          value={name}
          onChange={(e) => { setName(e.target.value); setSubmitted(false); }}
          className={submitted && !name.trim() ? "error" : ""}
          required
        />
        {submitted && !name.trim() && (
          <span className="error-msg">Le nom est obligatoire</span>
        )}

        <input
          type="tel"
          placeholder="Votre numéro *"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setSubmitted(false); }}
          className={submitted && !phone.trim() ? "error" : ""}
          required
        />
        {submitted && !phone.trim() && (
          <span className="error-msg">Le numéro est obligatoire</span>
        )}

        <input
          type="text"
          placeholder="Votre adresse *"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setSubmitted(false); }}
          className={submitted && !address.trim() ? "error" : ""}
          required
        />
        {submitted && !address.trim() && (
          <span className="error-msg">L'adresse est obligatoire</span>
        )}

        {/* PAYMENT BOX */}
        <div className="payment-box">
          <h3>Envoyez le paiement sur :</h3>

          <div className="payment-number">
            {paymentNumber}
          </div>

          {/* QR CODE */}
          <div className="qr-section">
            <h4>Scanner pour payer</h4>
            <QRCodeCanvas value={paymentNumber} size={180} />
          </div>
        </div>

        {/* BTN WHATSAPP */}
        <button className="whatsapp-btn" onClick={confirmPayment}>
          Confirmer sur WhatsApp
        </button>

      </div>
    </div>
  );
}
