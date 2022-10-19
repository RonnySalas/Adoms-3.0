import React from 'react'
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

//import images
import logoLight from "../../assets/images/logo-light.png";
import logoLightLetters from "../../assets/images/logo-light-letters.png";
const Logo = () => {
  return (
    <Row>
      <Col lg={12}>
        <div className="text-center mt-sm-5 mb-4 text-white-50">
          <div>
            <Link to="/" className="d-inline-block auth-logo">
              <img src={logoLight} alt="" height="100" />
              <img src={logoLightLetters} alt="" height="100" />
            </Link>
          </div>
          <p className="mt-3 fs-15 fw-medium">
            Organice y Administre su Ecommerce
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default Logo
