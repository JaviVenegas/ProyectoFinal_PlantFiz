import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { EditAddressForm } from "../components/EditAddressForm";
import { ENDPOINT } from "../config/constants";
import { AddAddressForm } from "../components/AddAddressForm";
import axios from "axios";

export const UserAddresses = () => {
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    getAddresses();
  }, [editAddress, addAddress]);

  const getAddresses = async () => {
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

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`${ENDPOINT.deleteAddress}/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      getAddresses();
    } catch (error) {
      console.error("Error al eliminar la direccion:", error);
    }
  };

  const handleAddAddress = () => {
    try {
      setAddAddress(true);
    } catch (error) {
      console.error("Error al agregar la direccion:", error);
    }
  };

  return (
    <Container fluid>
      <Container className="d-flex">
        <h2 className="mb-4">Mis Direcciones</h2>
      </Container>

      {editAddress ? (
        <EditAddressForm
          setEditAddress={setEditAddress}
          address={selectedAddress}
        />
      ) : addAddress ? (
        <AddAddressForm setAddAddress={setAddAddress} />
      ) :
        (
          <Container fluid className="d-flex" style={{ width: "100%" }}>
            <Card className="border p-2 shadow-sm" style={{ minWidth: "-webkit-max-content" }}>
              <Card.Body className="p-2">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
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
                        <strong>Código Postal:</strong> {address.codigo_postal}
                      </p>

                      <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
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

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            handleDeleteAddress(address.id);
                          }}
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      setAddAddress(true);
                      handleAddAddress();
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
