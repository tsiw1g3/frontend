import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import InsitutoDeComputacao from "../../../Assets/Images/instituto_de_computacao.png";
import { MyContext } from "../../../Context";
import "./styles.css";
import UserActions from "./UserActions";
/*
  Componente responsável pela renderização do cabeçalho da aplicação
*/

const Header = () => {
  const { logoutUser, isLoggedIn } = useContext(MyContext);
  const [isUserLogged, setIsUserLogged] = useState(isLoggedIn());

  const history = useHistory();

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

  const redirectTo = (path) => {
    history.push(path);
  };

  const onClickLogout = () => {
    logoutUser();
    setIsUserLogged(false);
    redirectTo("/");
  };

  return (
    <>
      <div className="header" expand="lg">
        <div className="logo-container">
          <Link className="link" to="/" style={{ textDecoration: "none" }}>
            <img
              src={InsitutoDeComputacao}
              alt="Logos IC"
              className="img-logo"
            />
            <h1 className="logo">Sistema de Defesas de TCC</h1>
          </Link>
        </div>
        {isUserLogged ? (
          <div className="authenticated-navigation">
            <ThemeProvider theme={theme}>
              <Button className="navigation-option" component={Link} to="/">
                Home
              </Button>
              <Button
                className="navigation-option"
                component={Link}
                to="/dashboard"
              >
                Minhas Bancas
              </Button>
              {localStorage.getItem("role") === "3" && (
                <Button
                  className="navigation-option"
                  component={Link}
                  to="/settings"
                >
                  Painel Administrativo
                </Button>
              )}
              <UserActions
                name={localStorage.getItem("nome")}
                role={localStorage.getItem("role")}
                onClickLogout={onClickLogout}
                isLoggedIn
              />
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
