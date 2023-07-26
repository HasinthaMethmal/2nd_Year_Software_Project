import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications"; // Import the ToastProvider
import Authmiddleware from "routes/route";
import NonAuthLayout from "Components/NonAuthLayout";
import VerticalLayout from "Components/VerticalLayout";
import { publicRoutes,authProtectedRoutes, sellerAuthProtectedRoutes, AdminAuthRoutes, buyerAuthRoutes } from "routes";
import SellerVerticalLayout from "Components/SellerVerticalLayout";
import SellerAuthMiddleware from "routes/SellerAuthMiddleware";
import AdminVerticalLayout from "Components/AdminVerticalLayout";
import Admindash from "pages/Admin/Dashboard";
import BuyerVerticalLayout from "Components/BuyerVerticalLayout";
// import SellerAuthMiddleware from "routes/SellerAuthMiddleware";



const App = () => {

  const Layout = VerticalLayout;

  return (
    <React.Fragment>
      <ToastProvider>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonAuthLayout>
                  {route.component}
                </NonAuthLayout>
              }
              key={idx}
              exact={true}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
          {
            sellerAuthProtectedRoutes.map((route,id) => (
              <Route
              path={route.path}
              element ={
                  <SellerAuthMiddleware>
                    <SellerVerticalLayout> {route.component} </SellerVerticalLayout>
                  </SellerAuthMiddleware>  
              }
              key={id}
              exact={true}
              />
            ))
          }
          {
            AdminAuthRoutes.map((route,id)=> (
              <Route
              path={route.path}
              element = {
                <AdminVerticalLayout>
                  {route.component}
                </AdminVerticalLayout>
              }
              key={id}
              exact ={true}
              />
            ))
          }
          {
            buyerAuthRoutes.map((route,id)=> (
              <Route
              path={route.path}
              element = {
                <BuyerVerticalLayout> {route.component}</BuyerVerticalLayout>
              }
              key={id}
              exact ={true}
              />
            ))
          }
          
          
        </Routes>
      </ToastProvider>
    </React.Fragment>
  );
};




export default App;
