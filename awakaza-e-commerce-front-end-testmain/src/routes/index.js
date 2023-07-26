import React from "react";
import { Navigate } from "react-router-dom";

// Authentication
import Login1 from "../pages/DeliveryAuthentication/Login";
import Register1 from "../pages/DeliveryAuthentication/Register";
import Recoverpw from "../pages/DeliveryAuthentication/Recoverpw";
import ForgetPwd1 from "../pages/DeliveryAuthentication/ForgetPassword";
import ConfirmMail from "../pages/DeliveryAuthentication/page-confirm-mail";
import EmailVerification from "../pages/DeliveryAuthentication/auth-email-verification";
import TwostepVerification from "../pages/DeliveryAuthentication/auth-two-step-verification";

//Tables
import InprogressTable from "../pages/DeliveryTables/InprogressTable";

// Dashboard
import Dashboard from "../pages/DeliveryDashboard-new/index";

//Pages
import Orders from "../pages/DeliveryOrders/Orders";
import Inprogress from "pages/DeliveryInprogress/Inprogress";
import History from "pages/DeliveryHistory/History";
import Accepted from "pages/DeliveryAccepted/Accepted";
import Payments from "pages/DeliveryPayments/Payments";
import Logout from "pages/DeliveryAuthentication/Logout";
import UserProfile from "pages/DeliveryAuthentication/user-profile";
import AdminLogin from "pages/Admin/Login/LoginPage";
import AdminRegister from "pages/Admin/Registration/SignupPage"
import Admindash from "pages/Admin/Dashboard";
import ViewCommission from "pages/Admin/Commission/ViewCommission";
import SellerRegister from "pages/Sellers/Registration/Register";
import SellerLogin from "pages/Sellers/login/Login";
import SellerLogout from "pages/Sellers/login/Logout";
import SellerForgotpw from "pages/Sellers/ForgotPassword/Forgotpw";
import SellerResetPassword from "pages/Sellers/common/ResetPassword";
import SellerDashboard from "pages/Sellers/Dashboard/index"
import Commission from "pages/Admin/Commission/Commission";

import { SellerOrders } from "pages/Sellers/Orders/SellerOrders";
import ProductList from "pages/Buyer/productlist";
import SearchResult from "pages/Buyer/SearchResult";
import ProductView from "pages/Buyer/ProductView";
import Cart from "pages/Buyer/Cart";
// import Payments from "pages/DeliveryPayments/Payments";

const authProtectedRoutes = [
  { path: "/profile", component: <UserProfile /> },

  // Authentication 
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/orders", component: <Orders /> },
  { path: "/inprogress", component: <Inprogress /> },
  { path: "/history", component: <History /> },
  { path: "/accepted", component: <Accepted /> },
  { path: "/payments", component: <Payments /> },
  { path: "/logout", component: <Logout /> },

  

  // Tables
  { path: "/tables-basic", component: <InprogressTable /> },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: < Navigate to="/dashboard" />,
  }
];

const AdminAuthRoutes = [
  { path: "/Admin/dashboard", component: <Admindash/> },
  { path: "/Admin/Commission", component: <ViewCommission/> },

  {
    path: "/",
    exact: true,
    component: < Navigate to="/Admin/dashboard" />,
  }
];
const sellerAuthProtectedRoutes = [
  
  { path: "/Seller/Dashboard/:id", component: <SellerDashboard/>},
  { path: "/Seller/orders/:id", component: <SellerOrders/>},
  {
    path: "/seller",
    exact: true,
    component: < Navigate to="/seller/dashboard" />,
  }
]

const buyerAuthRoutes= [
  { path: "/products", component: <ProductList/> },
  { path: "/products/search/:search", component: <SearchResult/> },
  { path: "/products/view/:id", component: <ProductView/> },
  { path: "/buyer/cart", component: <Cart/> },
  {
    path: "/products/search/",
    exact: true,
    component: < Navigate to="/products" />,
  }
]



const publicRoutes = [

  // Authentication 
  { path: "/login", component: <Login1 /> },
  { path: "/register", component: <Register1 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
   
  { path: "/Seller/Register", component: <SellerRegister/> },
  { path: "/Seller/Login", component: <SellerLogin/> },
  { path: "/Seller/Logout", component: <SellerLogout/> },
  { path: "/Seller/ForgotPassword", component:<SellerForgotpw/> },
  { path: "/Seller/resetpassword", component:<SellerResetPassword/> },

  { path: "/Admin/Login", component: <AdminLogin/> },
  { path: "/Admin/Register", component: <AdminRegister/> },
  

];

export { authProtectedRoutes, publicRoutes,sellerAuthProtectedRoutes,AdminAuthRoutes,buyerAuthRoutes };
