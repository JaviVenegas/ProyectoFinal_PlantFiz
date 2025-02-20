import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { AddressFormPage } from "./AddressFormPage";
import { ENDPOINT } from "../config/constants";
import axios from "axios";
import { AddAddress } from "./AddAddress";

export const UserAddresses = () => {
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    getAddresses();
    
  }, [editAddress]);

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

      const { data } = await axios.get(ENDPOINT.getAddresses, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setAddresses(data.directions);
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
    <Container>
      <Container className="d-flex">
        <h2 className="mb-4">Mis Direcciones</h2>
      </Container>

      {editAddress ? (
        <AddressFormPage
          setEditAddress={setEditAddress}
          address={selectedAddress}
        />
      ) : addAddress ? (
        <AddAddress setAddAddress={setAddAddress} />
      ) : (
        <Container className="d-flex mt-4">
          <Card className="w-100 border p-2 rounded shadow-sm">
            <Card.Body>
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
                      <strong>Código Postal:</strong>
                      {address.codigo_postal}
                    </p>

                    <div className="d-flex justify-content-end align-items-center gap-3">
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
                        onClick={() => handleDeleteAddress(address.id)}
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
                  onClick={handleAddAddress}
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
