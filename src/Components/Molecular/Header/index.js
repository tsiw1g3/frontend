import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import InsitutoDeComputacao from "../../../Assets/Images/instituto_de_computacao.png";
import { MyContext } from "../../../Context";
import "./styles.css";
/*
  Componente responsável pela renderização do cabeçalho da aplicação
*/

const Header = () => {
  const { logoutUser, isLoggedIn } = useContext(MyContext);
  const [isUserLogged, setIsUserLogged] = useState(isLoggedIn());

  const history = useHistory();

  const initialUser = {
    username: "",
    password: "",
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#6c7ae0",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      third: {
        light: "#ff7961",
        main: "#73D498",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  const theme2 = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#73D498",
        dark: "#2B8C50",
        contrastText: "#fff",
      },
    },
  });

  const redirectTo = (path) => {
    history.push(path);
  };

  const [user, setUser] = useState(initialUser);

  return (
    <>
      <div className="header" expand="lg">
        <div className="logo-container">
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={InsitutoDeComputacao}
                alt="Logos IC"
                className="img-logo"
              />
              <h1 className="logo">Sistema de Defesas de TCC</h1>
            </Link>
          </div>
        </div>

        {isUserLogged ? (
          <div className="login-form">
            <ThemeProvider theme={theme}>
              <div style={{ marginTop: 11, marginLeft: 20 }}>
                Olá, {localStorage.getItem("nome")}
              </div>
              <Button
                className="login-button"
                component={Link}
                to="/"
                style={{ marginTop: -20, marginLeft: 20 }}
              >
                Home
              </Button>
              <Button
                className="login-button"
                component={Link}
                to="/dashboard"
                style={{ marginTop: -20, marginLeft: 20 }}
              >
                Minhas Bancas
              </Button>
              {localStorage.getItem("role") === "3" && (
                <Button
                  className="login-button"
                  component={Link}
                  to="/settings"
                  style={{ marginTop: -20, marginLeft: 20 }}
                >
                  Configurações
                </Button>
              )}
              <Button
                className="login-button"
                onClick={() => {
                  logoutUser();
                  setIsUserLogged(false);
                  setUser(initialUser);
                  redirectTo("/");
                }}
                style={{
                  marginLeft: 20,
                  minWidth: 80,
                  height: 40,
                  borderRadius: 10,
                }}
                color="primary"
                variant="contained"
              >
                Logout
              </Button>
              <ThemeProvider theme={theme2}>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfTSPtMb09CIpLb0SjrtZM1Pfe8_5wrGrpZ2Ccr59ZdxPbFoA/viewform"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noreferrer"
                >
                  <Button
                    className="avaliacao-button"
                    onClick={() => {
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSfTSPtMb09CIpLb0SjrtZM1Pfe8_5wrGrpZ2Ccr59ZdxPbFoA/viewform",
                        "_blank"
                      );
                    }}
                    style={{
                      marginLeft: 20,
                      minWidth: 80,
                      height: 40,
                      borderRadius: 10,
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Avaliação
                  </Button>
                </a>
              </ThemeProvider>
            </ThemeProvider>
          </div>
        ) : (
          <div className="sign-in-buttons">
            <ThemeProvider theme={theme}>
              <Link
                variant="contained"
                color="primary"
                component={Button}
                to="login"
              >
                Login
              </Link>
              <Box width={8} />
              <Link
                variant="text"
                color="primary"
                component={Button}
                to="register"
              >
                Registre-se
              </Link>
            </ThemeProvider>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
