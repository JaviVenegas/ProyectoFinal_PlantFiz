import { Routes, Route } from "react-router-dom";
import { Home} from "../pages/Home";
import { AdminDashboard } from "../pages/AdminDashboard";
import { ProductCatalog } from "../pages/ProductCatalog";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";

// Si tienes rutas protegidas (ej: solo para administradores), importa el guard aquí
// import { AuthGuard } from "../guard/AuthGuard";

export const RouterManager = () => {
  return (
    <Routes>
      {/* Ruta pública: Página de inicio */}
      <Route path="/" element={<Home />} />

      {/* Ruta protegida: Panel de administración */}
      {/* <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} /> */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Ruta pública: Catálogo de productos */}
      <Route path="/catalog" element={<ProductCatalog />} />

      {/* Ruta dinámica: Detalles de un producto */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
