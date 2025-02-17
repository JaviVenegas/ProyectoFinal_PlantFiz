import React, { useState, useEffect } from "react";
import ProductCardGaleria from "../components/ProductCardGaleria";
import { Container, Button } from "react-bootstrap";
import Categorias from "../components/Categorias";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";

const Catalogo = () => {
  const [plantas, setPlantas] = useState([]);

  const fetchPlantas = async () => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantas);

      setPlantas(data.plantas || []);

      console.log(data);
      
    } catch (error) {
      console.error("Error al obtener las plantas:", error);
      setPlantas([]);
    }
  };

  useEffect(() => {
    fetchPlantas();
  }, []);

  return (
    <>
      <h1 className="d-flex mt-3 align-items-left align-self-sm justify-content-around">
        Tienda
      </h1>
      <Categorias />
      <Container className="d-flex mt-3 align-items-center align-self-sm-stretch justify-content-around">
        <Button variant="outline-secondary" className="w-100 me-5" style={{ borderRadius: "0" }}>
          <div className="d-flex align-items-center justify-content-evenly">Resultados</div>
        </Button>
        <Button variant="outline-secondary" className="w-100 ms-5" style={{ borderRadius: "0" }}>
          <div className="d-flex align-items-center justify-content-evenly">Filtros</div>
        </Button>
      </Container>
      <Container className="cd-flex mt-3 align-items-center justify-content-around">
        <div className="container-fluid p-0">
          <div className="row">
            {Array.isArray(plantas) && plantas.length > 0 ? (
              plantas.map((planta) => (
                <div className="col-12 col-md-3" key={planta.id}>
                  <ProductCardGaleria planta={planta} />
                </div>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Catalogo;
