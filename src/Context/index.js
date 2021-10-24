import React, { createContext, Component } from "react";
import axios from "axios";

export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
  baseURL: "https://organizacao-de-defesas.herokuapp.com",
});

class MyContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
    };
    this.isLoggedIn();
  }

  // Root State
  state = {
    isAuth: false,
  };

  // On Click the Log out button
  logoutUser = () => {
    localStorage.removeItem("loginToken");
    this.setState({
      ...this.state,
      isAuth: false,
    });
  };

  registerUser = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("usuario", {
      nome: user.nome,
      email: user.email,
      username: user.username,
      password: user.password,
      school: user.universidade,
      academic_title: "Bacharelado",
      status: "user",
    });

    return register.data;
  };

  loginUser = async (user) => {
    var bodyFormData = new FormData();
    bodyFormData.append("username", user.username);
    bodyFormData.append("password", user.password);

    const res = await axios({
      method: "post",
      url: "https://organizacao-de-defesas.herokuapp.com/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        // handleClick();
        return response;
      })
      .catch(function (response) {
        //handle error
        return 0;
      });

    return res;
    // return login.data;
  };

  // Checking user logged in or not
  isLoggedIn = () => {
    return localStorage.getItem("loginToken") !== null;
  };

  render() {
    const contextValue = {
      rootState: this.state,
      toggleNav: this.toggleNav,
      isLoggedIn: this.isLoggedIn,
      registerUser: this.registerUser,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
    };
    return (
      <MyContext.Provider value={contextValue}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyContextProvider;
