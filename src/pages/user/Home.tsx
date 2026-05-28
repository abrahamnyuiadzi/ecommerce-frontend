import { useEffect, useState } from "react";
import api from "../../api/axios";


import Navbar from "../../components/Navbar";
import "./home.css";
import type { Product } from "../../types";
import ProductCard from "../../components/ProductCart";
import Footer from "../../components/Footer";



export default function Home() {
   const [products, setProducts] = useState<Product[]>([]);

const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter(
  (product: any) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
);

  return (
    <>
   <Navbar
  search={search}
  setSearch={setSearch}
/>
       <h1>Nos produits</h1>
     
      
      <div className="container">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
        <Footer />
    </>
  );
}