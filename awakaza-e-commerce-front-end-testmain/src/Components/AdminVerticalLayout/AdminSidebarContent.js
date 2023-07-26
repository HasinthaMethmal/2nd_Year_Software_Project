import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import withRouter from "Components/Common/withRouter";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const SidebarContent = props => {


  return (
    <React.Fragment>
      
        <div id="sidebar-menu" style={{position:"fixed" }}>
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/Admin/dashboard/">
                <i className="bx bx-slider  "></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Admin/SellerControls">
                <i className="fas far fa-user-circle"></i>
                <span>{props.t("Seller Controls")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Admin/CustomerControls">
                <i className="bx bx bx-face"></i>
                <span>{props.t("Customer Controls")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Admin/DeliveryPartnerControls">
                <i className="mdi mdi-truck-check-outline"></i>
                <span>{props.t("Delivery Partner Controls")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Admin/Commission">
                <i className="bx bx-money"></i>
                <span>{props.t("Commission details")}</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/logout">
                <i className="bx bx-log-out-circle"></i>
                <span>{props.t("Logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
