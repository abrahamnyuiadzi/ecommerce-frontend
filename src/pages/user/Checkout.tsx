import { useLocation } from "react-router-dom";
import { useState } from "react";
// import QRCode from "react-qr-code";
import "./checkout.css";
import { QRCodeCanvas } from "qrcode.react";

export default function Checkout() {

  const location = useLocation();

  // ✅ PRODUIT DIRECT
  const product = location.state?.product;

  // ✅ QUANTITE
  const quantity = location.state?.quantity || 1;

  // ✅ SI AUCUN PRODUIT
  if (!product) {

    return (
      <div style={{ padding: 40 }}>
        <h2>
          Aucun produit sélectionné
        </h2>
      </div>
    );
  }

  // ✅ INFOS CLIENT
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  // ✅ PAYMENT
  const [paymentMethod, setPaymentMethod] =
    useState("tmoney");

  // ✅ TOTAL
  const total =
    Number(product.price) * Number(quantity);

  // ✅ NUMEROS
  const numbers = {
    tmoney: "22890839154",
    flooz: "22879859151"
  };

  // ✅ WHATSAPP
  const confirmPayment = () => {

    const adminNumber = "22879859151";

    const message = `
Nouvelle commande

Produit: ${product.name}

Quantité: ${quantity}

Total: ${total} FCFA

Téléphone: ${phone}

Adresse: ${address}

Paiement: ${paymentMethod}
`;

    const url =
`https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodeURIComponent(message)}`;

    window.location.href = url;
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

            <p>
              Prix: {product.price} FCFA
            </p>

            <p>
              Quantité: {quantity}
            </p>

          </div>

        </div>

        {/* TOTAL */}
        <div className="total">

          Total: {total} FCFA

        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Votre numéro"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Votre adresse"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        {/* SELECT */}
        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >

          <option value="tmoney">
            TMoney
          </option>

          <option value="flooz">
            Flooz
          </option>

        </select>

        {/* PAYMENT BOX */}
        <div className="payment-box">

          <h3>
            Envoyez le paiement sur :
          </h3>

          <div className="payment-number">

            {
              numbers[
                paymentMethod as keyof typeof numbers
              ]
            }

          </div>

          {/* QR CODE */}
          <div className="qr-section">

            <h4>
              Scanner pour payer
            </h4>

         <QRCodeCanvas
  value={
    numbers[
      paymentMethod as keyof typeof numbers
    ]
  }
  size={180}
/>
          

          </div>

        </div>

        {/* BTN */}
        <button
          className="whatsapp-btn"
          onClick={confirmPayment}
        >
          Confirmer sur WhatsApp
        </button>

      </div>

    </div>
  );
}