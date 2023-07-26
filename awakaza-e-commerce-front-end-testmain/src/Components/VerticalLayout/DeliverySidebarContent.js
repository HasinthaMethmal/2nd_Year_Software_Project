import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import withRouter from "Components/Common/withRouter";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const SidebarContent = props => {


  return (
    <React.Fragment>
      <SimpleBar className="h-100"
      >
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <i className="bx bx-cart"></i>
                <span>{props.t("Orders")}</span>
              </Link>
            </li>
            <li>
              <Link to="/inprogress">
                <i className="bx bxs-basket"></i>
                <span>{props.t("Inprogress")}</span>
              </Link>
            </li>
            <li>
              <Link to="/history">
                <i className="bx bx-timer"></i>
                <span>{props.t("History")}</span>
              </Link>
            </li>
            <li>
              <Link to="/accepted">
                <i className="bx bxs-purchase-tag"></i>
                <span>{props.t("Accepted")}</span>
              </Link>
            </li>
            <li>
              <Link to="/payments">
                <i className="bx bx-money"></i>
                <span>{props.t("Payments")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
