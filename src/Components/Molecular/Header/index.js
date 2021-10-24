import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../Context";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import "./styles.css";

const Header = () => {
  const { loginUser, logoutUser } = useContext(MyContext);
  const [isUserLogged, setIsUserLogged] = useState(false);

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
    <div className="header" bg="light" expand="lg">
      <div className="logo-container">
        <Link style={{ textDecoration: "none" }}>
          <h1 className="logo">moon</h1>
        </Link>
      </div>

      {isUserLogged ? (
        <div>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ marginTop: 20 }}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                logoutUser();
                setIsUserLogged(false);
                redirectTo("/");
              }}
            >
              Logout
            </MenuItem>
            <MenuItem component={Link} to="/dashboard">
              Dashboard
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <form className="login-form" onSubmit={submitForm}>
          <TextField
            className="login-input"
            name="username"
            label="Usuário"
            variant="outlined"
            size="small"
            onChange={onChangeValue}
          />
          <TextField
            className="login-input"
            name="password"
            label="Senha"
            variant="outlined"
            size="small"
            type="password"
            onChange={onChangeValue}
          />
          <Button
            className="login-button"
            type="submit"
            style={{ marginTop: -20 }}
          >
            Entrar
          </Button>
        </form>
      )}
    </div>
  );
};

export default Header;
