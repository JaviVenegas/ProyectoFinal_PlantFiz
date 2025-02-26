import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PiPlant } from "react-icons/pi";
import { PiPottedPlant } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";

const ElijePlantfiz = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-3">¿Por qué Plantfiz?</h1>
      <Row className="p-1">
        {/* Columna 1: Atención personalizada*/}
        <Col md={4} className="text-center">
          <PiPlant className="fs-1 mb-2" />
          <h5 className="mb-4">Atención personalizada</h5>
          <p>
            En Plantfiz nos importa cada cliente. Te ayudamos a elegir las
            plantas que mejor se adapten a tu espacio y necesidades, además de
            ofrecerte seguimiento post-venta para asegurarnos de que tengas la
            mejor experiencia.
          </p>
        </Col>
        {/* Columna 2: Variedad y calidad */}
        <Col md={4} className="text-center">
          <IoSunnyOutline className="fs-1 mb-2" />
          <h5 className="mb-4">Variedad y calidad</h5>
          <p>
            Ofrecemos una aplia variedad de plantas que abarca desde planta de
            interior a exterios.
          </p>
        </Col>
        {/* Columna 3: Somos una tienda confiable */}
        <Col md={4} className="text-center">
          <PiPottedPlant className="fs-1 mb-2" />
          <h5 className="mb-4">Somos una tienda confiable</h5>
          <p>
            Al elegirnos, estás optando por una tienda comprometida con la
            calidad y la satisfacción del cliente. Contamos con productos que
            garantizan la salud y longevidad de tus plantas, y siempre estamos
            dispuestos a brindarte el mejor servicio.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ElijePlantfiz;
