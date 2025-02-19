import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { AddressForm } from "../components/AddressForm";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

export const UserAddresses = () => {
  const [editAddress, setEditAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(ENDPOINT.getAddresses, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });

        setAddresses(data.directions);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };

    fetchAddresses();
  }, [session.token]);

  return (
    <Container>
      <Container className="d-flex">
        <h2 className="mb-4">Mis Direcciones</h2>
      </Container>

      {editAddress ? (
        <AddressForm
          setEditAddress={setEditAddress}
          address={selectedAddress}
        />
      ) : (
        <Container className="d-flex mt-4">
          <Card className="w-50 border p-4 rounded shadow-sm">
            <Card.Body>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div key={index} className="mb-3 p-2 border rounded">
                    <p className="mb-1">
                      <strong>Dirección:</strong> {address.direccion},
                    </p>
                    <p className="mb-1">
                      <strong>Ciudad:</strong> {address.ciudad},
                    </p>
                    <p className="mb-1">
                      <strong>Región:</strong> {address.region},
                    </p>
                    <p className="mb-1">
                      <strong>Código Postal:</strong>
                      {address.codigo_postal || "N/A"}
                    </p>
                    <div className="d-flex justify-content-end align-items-center gap-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          console.log("Eliminar dirección", address.id)
                        }
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => {
                          setSelectedAddress(address); 
                          setEditAddress(true); 
                        }}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tienes direcciones registradas.</p>
              )}

              <div className="text-center mt-4">
                <Button
                  variant="dark"
                  onClick={() => {
                    setSelectedAddress(null);
                    setEditAddress(true);
                  }}
                >
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
