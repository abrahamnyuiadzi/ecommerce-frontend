import { useState } from "react";
import api from "../../api/axios";
import "./login.css";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const login = async () => {

    try {

      const res = await api.post(
        "/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.href = "/admin";

    } catch (err: any) {

      setError(
        err.response?.data?.error ||
        "Erreur de connexion"
      );

    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>
          Connexion Admin
        </h2>

        <p className="subtitle">
          Connectez-vous au dashboard
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Se connecter
        </button>

      </div>

    </div>
  );
}