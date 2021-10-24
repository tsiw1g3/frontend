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
        <div
          className="app-container"
          style={{
            minHeight: 500,
            backgroundImage: `url(/frontend/img/bg.png)`,
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
