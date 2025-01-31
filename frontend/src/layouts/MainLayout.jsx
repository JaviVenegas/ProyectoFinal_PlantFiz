import { Outlet } from 'react-router-dom';
import { CustomNav } from '../components/Nav';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <>
      {/* Navbar visible en todas las páginas públicas */}
      <CustomNav />

      {/* Contenido dinámico de las páginas (Home, Catalog, etc.) */}
      <main className="container">
        <Outlet />
      </main>

      {/* Footer visible en todas las páginas públicas */}
      <Footer />
    </>
  );
};