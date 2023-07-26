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
              <Link to="/Products">
                <i className="bx bx-basket"></i>
                <span>{props.t("Products")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Buyer/cart">
                <i className="bx bx-cart"></i>
                <span>{props.t("Cart")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Buyer/Orders">
                <i className="bx bx bx-basket"></i>
                <span>{props.t("Orders")}</span>
              </Link>
            </li>
            <li>
              <Link to="/Buyer/logout">
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
