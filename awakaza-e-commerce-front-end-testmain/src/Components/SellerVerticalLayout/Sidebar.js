import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "Components/Common/withRouter";
import { withTranslation } from "react-i18next";
import DeliverySidebarContent from "./SellerSidebarContent";
import { Link } from "react-router-dom";
import awakazalogopng from "../../assets/images/awakaza-logo.png";
import SellerSidebarContent from "./SellerSidebarContent";

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/seller/login" className="logo logo-light">
            <span className="logo-lg">
              <img src={awakazalogopng} alt="" height="45" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SellerSidebarContent /> : <SellerSidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
