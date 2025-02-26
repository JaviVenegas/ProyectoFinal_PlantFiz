import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Header = () => {
  return (
    <header
      className="d-flex align-items-center justify-content-center my-5"
      style={{
        backgroundImage: "url('public/images/header_image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Row
          className="text-center"
          style={{
            backgroundColor: "rgba(125, 114, 155, 0.3)",
            padding: "20px",
            fontWeight: "bold",
            color: "#7f739e",
            textShadow: "0px 0px 3px rgba(0, 0, 0, 1)",
          }}
        >
          <h1 className="mb-3">PlantFiz</h1>
          <h4 className="mb-3">¡El verde perfecto para tu rincón favorito!</h4>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
