import React from "react";
import { Container, Row } from "reactstrap";
import CardUser from "./card-user";
import CardWelcome from "./card-welcome";

const Dashboard = props => {
  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Orders",
      value: "1,452",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: "Rs.78452.00",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Average Earn",
      value: "Rs.816.20",
      badgeValue: "0%",
      color: "warning",
      desc: "From previous period",
    },
  ]

  document.title = "Dashboard | Awakaza Delivery"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CardUser />
          <Row>
            <CardWelcome />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
