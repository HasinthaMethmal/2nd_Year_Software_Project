import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React from "react";
import { Navigate } from "react-router-dom";


 const SellerAuthMiddleware = (props) => {
   
    const token = sessionStorage.getItem("logintoken")
  if (token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken.exp)
    console.log(Date.now())
    if (decodedToken.exp < Date.now()/1000) {
      return <Navigate to={{ pathname: "/Seller/Logout", state: { from: props.location } }} />
    }
    }else if(!token){
     return <Navigate to={{ pathname: "/seller/login", state: { from: props.location } }} />
    }
  return (
    <React.Fragment>
    {props.children}
  </React.Fragment>
  )
}
export default SellerAuthMiddleware;