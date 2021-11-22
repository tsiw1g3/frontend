import React from "react";
import { HashRouter } from "react-router-dom";

import Routes from "../../routes";
import Header from "../Molecular/Header";
import Footer from "../Molecular/Footer";
import Context from "../../Context";

/*
  Componente responsável pela renderização do 'invólucro' da aplicação
*/

function App() {
  return (
    <HashRouter>
      <Context>
        <Header />
        <div
          className="app-container"
          style={{
            minHeight: 500,
          }}
        >
          <div
            style={{
              minHeight: 500,
            }}
          >
            <Routes />
          </div>
          <Footer />
        </div>
      </Context>
    </HashRouter>
  );
}

export default App;
