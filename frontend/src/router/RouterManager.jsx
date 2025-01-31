import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "../pages/Home";
import { AdminDashboard } from "../pages/AdminDashboard";
import { ProductCatalog } from "../pages/ProductCatalog";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";
import { CustomNav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export const RouterManager = () => {
  return (
    <Router>
      {/* Navbar visible en todas las páginas */}
      <CustomNav />

      {/* Contenedor de las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer visible en todas las páginas */}
      <Footer />
    </Router>
  );
};