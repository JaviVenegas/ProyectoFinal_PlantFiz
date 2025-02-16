import { useAuth } from "../hooks/useAuth";
export const UserDashboard = () => {
  const { session } = useAuth();

  return (
    <>
      <div className="user-header mb-4">
        <h1>Panel del Usuario</h1>
        <p className="text-muted">
          Bienvenido {session?.user?.nombre} {session?.user?.apellido}, aquí	
          podras ver tus datos, tus pedidos, tus direcciones y tus favoritos
        </p>
      </div>
    </>
  );
};
