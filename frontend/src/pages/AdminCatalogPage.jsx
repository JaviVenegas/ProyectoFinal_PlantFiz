import { AdminCatalog } from "../components/AdminCatalog.jsx";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useState, useEffect } from "react";

export const AdminCatalogPage = () => {
  const navigate = useNavigate();

  const [plantas, setPlantas] = useState([]);

  const fetchPlantas = async () => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantas);
      setPlantas(data.plantas || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlantas();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="my-4">Editar catálogo</h2>
      <Container className="mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/admin/AdminAgregarProducto`)}
          className="w-50"
          style={{ borderRadius: "5px" }}
        >
          <div className="d-flex align-items justify-content-evenly">
            Agregar producto
          </div>
        </Button>
      </Container>

      <Container className="mt-5">
        {plantas.map((planta) => (
          <AdminCatalog key={planta.id} product={planta} />
        ))}
      </Container>
    </Container>
  );
};
