import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { UserEditForm } from "../components/UserEditForm";

export const UserData = () => {
  const [edit, setEdit] = useState(false);
  const { session } = useAuth();

  return (
    <Container>
      <Container className="d-flex">
        <h2 className="mb-4">Mi Cuenta</h2>
      </Container>

      {edit ? (
        <UserEditForm setEdit={setEdit}/>
      ) : (
        <Container className="d-flex mt-4">
          <Card className="w-50 border p-4 rounded shadow-sm">
            <Card.Body>
              <p className="mb-2">
                <strong>RUT:</strong> {session?.user?.rut}
              </p>
              <p className="mb-2">
                <strong>Nombre:</strong> {session?.user?.nombre}
              </p>
              <p className="mb-2">
                <strong>Apellido:</strong> {session?.user?.apellido}
              </p>
              <p className="mb-2">
                <strong>Teléfono:</strong> {session?.user?.telefono}
              </p>

              <div className="text-center mt-3">
                <Button variant="dark" onClick={() => setEdit(true)}>
                  Editar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Container>
  );
};
