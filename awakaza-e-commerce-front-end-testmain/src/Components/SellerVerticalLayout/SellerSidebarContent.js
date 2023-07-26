import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import withRouter from "Components/Common/withRouter";
import { Link, Navigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";

const SidebarContent = props => {
 const decodeT = jwtDecode(sessionStorage.getItem('logintoken'))
 console.log(decodeT)

  return (
    <React.Fragment>
     
        <div id="sidebar-menu" style={{position:"fixed"}}>
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to={`/seller/dashboard/${decodeT.result.seller_id}`}>
                <i className="bx bx-slider  "></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/products">
                <i className="bx bx-basket"></i>
                <span>{props.t("Products")}</span>
              </Link>
            </li>
            <li>
              <Link to={`/seller/orders/${decodeT.result.seller_id}`} >
                <i className="bx bx-cart"></i>
                <span>{props.t("orders")}</span>
              </Link>
            </li>
            <li>
              <Link to="seller/reports">
                <i className="dripicons-document-new"></i>
                <span>{props.t("analytics")}</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/payments">
                <i className="bx bx-money"></i>
                <span>{props.t("Payment details")}</span>
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
