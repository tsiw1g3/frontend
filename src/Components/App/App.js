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
            minHeight: "81.5vh",
            maxHeight:"85vh",
            maxWidth:"99.9vw"
          }}
        >
          <div
            style={{
              minHeight: 500,
            }}
          >
            <Routes />
          </div>
        </div>
      </Context>
      <Footer />
    </HashRouter>
  );
}

export default App;
