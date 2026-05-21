import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";

import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";
import Orders from "./pages/admin/orders";
import EditProduct from "./pages/admin/EditProduct";
import ProductDetail from "./pages/user/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ADMIN LOGIN */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* ADMIN */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout><Dashboard /></AdminLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/orders" element={
  <PrivateRoute>
    <AdminLayout><Orders /></AdminLayout>
  </PrivateRoute>
} />

<Route path="/admin/edit-product/:id" element={
  <PrivateRoute>
    <AdminLayout><EditProduct /></AdminLayout>
  </PrivateRoute>
} />

        <Route path="/admin/products" element={
          <PrivateRoute>
            <AdminLayout><Products /></AdminLayout>
          </PrivateRoute>
        } />

        <Route path="/admin/add-product" element={
          <PrivateRoute>
            <AdminLayout><AddProduct /></AdminLayout>
          </PrivateRoute>
        } />
        

      </Routes>
      
      


    </BrowserRouter>
  );
}

export default App;