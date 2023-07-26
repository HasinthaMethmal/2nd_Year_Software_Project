import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(history));
  }, [dispatch, history]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);