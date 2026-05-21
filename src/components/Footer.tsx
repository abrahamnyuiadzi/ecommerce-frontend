import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLONNE 1 */}
        <div>
          <h3>Elinam Shop</h3>
          <p>Votre boutique <br /> 
          en ligne fiable.</p>
        </div>

        {/* COLONNE 2 */}
        <div>
          <h4>Liens</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/cart">Panier</a></li>
            <li><a href="/login">Admin</a></li>
          </ul>
        </div>

        {/* COLONNE 3 */}
        <div>
          <h4>Contact</h4>
          <p>Email: aoronelie@shop.com</p>
          <p>Téléphone: +228 90 83 91 54</p>
        </div>

        {/* COLONNE 4 */}
        <div>
          <h4>Suivez-nous</h4>
          <div className="socials">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        © 2026 Shop - Tous droits réservés
      </p>

    </footer>
  );
}