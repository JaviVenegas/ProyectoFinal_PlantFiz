import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthGuard } from "../guard/AuthGuard";
import { MainLayout } from "../layouts/MainLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../pages/Home";
import { ProductCatalog } from "../pages/ProductCatalog";
import { ProductDetails } from "../pages/ProductDetails";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFound } from "../pages/NotFound";
// import { AdminProductsPage } from "../pages/AdminProductsPage";
// import { AdminUsersPage } from "../pages/AdminUsersPage";

export const RouterManager = () => {
  const { session } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas con MainLayout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<ProductCatalog />} /> {/* Aquí va el catalogo de producto del usuario(cliente) */}
          <Route path="/product/:id" element={<ProductDetails />} /> {/* Aquí va el detalle de producto del usuario(cliente) */}
        </Route>

        {/* Rutas de Autenticación sin Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas de Admin (Protegidas) con AdminLayout */}
        <Route
          path="/admin/*"
          element={
            <AuthGuard isAllow={session?.rol === "admin"} redirectTo="/login">
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={<ProductCatalog />} />
          <Route path="products" element={'<AdminProductsPage />'} />
          <Route path="users" element={'<AdminUsersPage />'} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
