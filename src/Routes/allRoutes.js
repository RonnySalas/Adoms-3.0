import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardEcommerce },
  { path: "/index", component: DashboardEcommerce },
  { path: "/apps-ecommerce-orders", component: EcommerceOrders },

  //User Profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  }
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };