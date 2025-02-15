
import { AdminCatalog } from "../components/AdminCatalog.jsx";
import { Container } from "react-bootstrap";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useState, useEffect } from "react";


export const AdminCatalogPage = () => {

  const [plantas, setPlantas] = useState([]);

  const getPlantas = async () => {
    try {
      const response = await axios.get(ENDPOINT.getPlantas);
      setPlantas(response.data.data.rows || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlantas();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Editar catálogo</h2>
      {plantas.map((planta) => (
        <AdminCatalog key={planta.id} product={planta} />
      ))}
    </Container>
  );
};