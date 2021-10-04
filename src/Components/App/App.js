import React from "react";
import { HashRouter } from "react-router-dom";

import Routes from "../../routes";
import Header from "../Molecular/Header";
import Footer from "../Molecular/Footer";
import Context from "../../Context";

function App() {
  return (
    <HashRouter>
      <Context>
        <Header />
        <body style={{ minHeight: 500 }}>
          <Routes />
        </body>
        <Footer />
      </Context>
    </HashRouter>
  );
}

export default App;
