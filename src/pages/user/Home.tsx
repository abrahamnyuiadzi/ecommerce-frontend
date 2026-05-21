import { useEffect, useState } from "react";
import api from "../../api/axios";

import Navbar from "../../components/Navbar";
import "./home.css";
import type { Product } from "../../types";
import ProductCard from "../../components/ProductCart";
import Footer from "../../components/Footer";



export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <>
      <Navbar />
       <h1>Nos produits</h1>
     
      
      <div className="container">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
        <Footer />
    </>
  );
}