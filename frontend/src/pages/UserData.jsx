import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { UserEditForm } from "../components/UserEditForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export const UserData = () => {
  const [editData, setEditData] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const { session } = useAuth();

  return (
    <Container>
      <Container className="d-flex">
        <h2 className="mb-4">Mi Cuenta</h2>
      </Container>

      {editData ? (
        <UserEditForm setEditData={setEditData}/>
      ) : editPassword ? (
        <ChangePasswordForm setEditPassword={setEditPassword}/>
      ) : (
        <Container className="d-flex mt-4">
          <Card className="w-50 border p-4 rounded shadow-sm ">
            <Card.Body>
              <p className="mb-2 p-1">
                <strong>RUT:</strong> {session?.user?.rut}
              </p>
              <p className="mb-2 p-1">
                <strong>Nombre:</strong> {session?.user?.nombre}
              </p>
              <p className="mb-2 p-1">
                <strong>Apellido:</strong> {session?.user?.apellido}
              </p>
              <p className="mb-2 p-1">
                <strong>Teléfono:</strong> {session?.user?.telefono}
              </p>

              <div className="text-center mt-3 d-flex justify-content-center align-items-center gap-5">
                <Button variant="dark" onClick={() => setEditData(true)}>
                  Editar Datos
                </Button>
                <Button variant="dark" onClick={() => setEditPassword(true)}>
                  Cambiar Contraseña
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Container>
  );
};
