import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { AddressForm } from "../components/AddressForm";

export const UserAddresses = () => {
  const [editAddress, setEditAddress] = useState(false);
  const { session } = useAuth();

  return (
    <Container>
      <Container className="d-flex">
        <h2 className="mb-4">Mis Direcciones</h2>
      </Container>

      {editAddress ? (
        <AddressForm setEditAddress={setEditAddress} />
      ) : (
        <Container className="d-flex mt-4">
          <Card className="w-50 border p-4 rounded shadow-sm">
            <Card.Body>
              {session?.user?.addresses?.length > 0 ? (
                session.user.addresses.map((address, index) => (
                  <div key={index} className="mb-3 p-2 border rounded">
                    <p className="mb-1">
                      <strong>Dirección:</strong> {address.street}, {address.city}
                    </p>
                    <p className="mb-1">
                      <strong>Región:</strong> {address.region}
                    </p>
                    <p className="mb-1">
                      <strong>Código Postal:</strong> {address.postalCode}
                    </p>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => console.log("Eliminar dirección", address.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tienes direcciones registradas.</p>
              )}

              <div className="text-center mt-4">
                <Button variant="dark" onClick={() => setEditAddress(true)}>
                  Añadir Dirección
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Container>
  );
};
