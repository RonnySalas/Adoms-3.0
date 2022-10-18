import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Adoms 3.0 Recargado";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Dashboards" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
