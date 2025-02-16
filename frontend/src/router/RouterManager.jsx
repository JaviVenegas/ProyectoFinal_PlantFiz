import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthGuard } from "../guard/AuthGuard";
import { MainLayout } from "../layouts/MainLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AdminCatalogPage } from "../pages/AdminCatalogPage";
import NotFound from "../pages/NotFound";
import Catalogo from "../pages/Catalogo";
import AdminEditarInfoProducto from "../pages/AdminEditarInfoProducto";

//Estos imports serán reemplazados por el Product Detail hecho por Javi
//import { ProductDetails } from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import DetalleProducto from "../pages/DetalleProducto";
import { PerfilUsuario } from "../pages/PerfilUsuario";
import { UserDashboard } from "../pages/UserDashboard";
import { UserData } from "../pages/UserData";

export const RouterManager = () => {
  const { session } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rutas Públicas con MainLayout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          {/* Aquí va el catalogo de producto del usuario(cliente) */}
          <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
          {/* Aquí va el detalle de producto del usuario(cliente) */}
          <Route path="/cart" element={<Cart />} />

          {/* Seccion de usuario como ruta hija */}
          <Route path="/perfil/" element={<PerfilUsuario />}>
            {/* Rutas hijas de perfil */}
            <Route index element={<UserDashboard />} />
            <Route path="data" element={<UserData />} />
            <Route path="orders" element={"<UserOrders />"} />
            <Route path="addresses" element={"<UserAddresses />"} />
            <Route path="favorites" element={"<UserFavorites />"} />
          </Route>
        </Route>

        {/* Rutas de Autenticación sin Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas de Admin (Protegidas) con AdminLayout */}
        <Route
          path="/admin/*"
          element={
            <AuthGuard
              isAllow={session?.user.rol === "admin"}
              redirectTo="/login"
            >
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={"Panel de administración"} />
          <Route path="products" element={<AdminCatalogPage />} />
          <Route path="users" element={"<AdminUsersPage />"} />

          <Route
            path="AdminEditarInfoProducto/:id"
            element={<AdminEditarInfoProducto />}
          />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
