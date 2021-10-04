import React from "react";
import { Route } from "react-router-dom";

import Home from "./Pages/Home";
import ExaminingBoard from "./Pages/ExaminingBoard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const Routes = () => {
  return (
    <>
      <Route component={Home} path="/" exact />
      <Route component={ExaminingBoard} path="/banca/criar" />
      <Route component={Login} path="/login" exact />
      <Route component={Register} path="/register" exact />
    </>
  );
};

export default Routes;
