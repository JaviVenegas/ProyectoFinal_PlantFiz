import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import Nav from "../components/Nav";
import Catalogo from "../pages/Catalogo";
import Cart from "../pages/Cart";
import DetalleProducto from "../pages/DetalleProducto";
import Footer  from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export const RouterManager = () => {
  return (
    <Router>
      <CartProvider>
        {/* Navbar visible en todas las páginas */}
        <Nav/>
        {/* Contenedor de las rutas */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/catalogo" element={<Catalogo/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        {/* Footer visible en todas las páginas */}
        <Footer/>
      </CartProvider>
    </Router>
  );
};




