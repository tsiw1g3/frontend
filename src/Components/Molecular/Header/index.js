import React, { useContext, useState } from "react";
import { MyContext } from "../../../Context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./styles.css";

/*
  Componente responsável pela renderização do cabeçalho da aplicação
*/

const Header = () => {
  const { loginUser, logoutUser, isLoggedIn } = useContext(MyContext);
  const [isUserLogged, setIsUserLogged] = useState(isLoggedIn());

  const history = useHistory();

  const initialUser = {
    username: "",
    password: "",
  };

  const redirectTo = (path) => {
    history.push(path);
  };

  const [user, setUser] = useState(initialUser);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(user);
    if (data.data) {
      localStorage.setItem("userId", data.data.id);
      localStorage.setItem("loginToken", data.data.token);
      setIsUserLogged(true);
      redirectTo("dashboard");
      // await isLoggedIn();
    } else {
      console.log("kk, man");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="header"
      expand="lg"
      style={{
        backgroundImage: `url(/frontend/img/header.png)`,
      }}
    >
      <div className="logo-container">
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/frontend/img/instituto_de_computacao.png"
              alt="Logos IC"
              className="img-logo"
            />
            <h1 className="logo" >Sistema de Defesas de TCC</h1>
          </Link>
        </div>
      </div>

      {isUserLogged ? (
        <div className="login-form">
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
          <Button
            className="login-button"
            onClick={() => {
              logoutUser();
              setIsUserLogged(false);
              setUser(initialUser);
              redirectTo("/");
            }}
            style={{ marginTop: -20, marginLeft: 20 }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <form className="login-form" onSubmit={submitForm}>
          <TextField
            className="login-input"
            name="username"
            label="Usuário"
            variant="outlined"
            size="small"
            style={{ marginLeft: 20 }}
            onChange={onChangeValue}
          />
          <TextField
            className="login-input"
            name="password"
            label="Senha"
            variant="outlined"
            size="small"
            type="password"
            style={{ marginLeft: 20 }}
            onChange={onChangeValue}
          />
          <Button
            className="login-button"
            type="submit"
            style={{ marginTop: -10, marginLeft: 20 }}
          >
            Entrar
          </Button>
          <Button
            className="login-button"
            style={{ marginTop: -10, minWidth: 90, marginRight: -20 }}
            onClick={() => {
              redirectTo("/register");
            }}
          >
            Registrar
          </Button>
        </form>
      )}
    </div>
  );
};

export default Header;
