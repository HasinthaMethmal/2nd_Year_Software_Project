import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true} className="d-flex justify-content-center">
          <div className="text-sm-end d-none d-sm-block">
            <h6>2023 © All Rights Reserved |  Developed by <a href="https://circlebook.site" target="_blank" rel="noopener noreferrer">Circlebook</a></h6>
          </div>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
