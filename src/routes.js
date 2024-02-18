import React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import ExaminingBoard from "./Pages/ExaminingBoard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Addition from "./Pages/Addition";
import ViewBoard from "./Pages/ViewBoard";
import ViewBanca from "./Pages/ViewBanca";
import ResetPassword from "./Pages/ResetPassword";
import SettingsPage from "Pages/Settings";
import Users from "Pages/Users";

const Routes = () => {
  return (
    <>
      <Route component={Home} path="/" exact />
      <Route component={ExaminingBoard} path="/addbanca" />
      <Route component={Login} path="/login" exact />
      <Route component={Register} path="/register" exact />
      <Route component={Dashboard} path="/dashboard" exact />
      <Route component={ViewBanca} path="/verbanca" exact />
      <Route component={Addition} path="/addition" exact />
      <Route component={SettingsPage} path="/settings" exact />
      <Route component={Users} path="/users" exact />
      <Route component={ViewBoard} path="/editarbanca" exact />
      <Route component={ResetPassword} path="/resetpass" exact />
    </>
  );
};

export default Routes;
