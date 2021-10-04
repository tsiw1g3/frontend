import React, { useContext, useState } from "react";
import { MyContext } from "../../Context";
import "./styles.css";

function Login() {
  const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);

  const initialState = {
    userInfo: {
      username: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.data) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.data);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <div className="_loginRegister">
      <div className="column">
        <img
          width="70%"
          height="70%"
          alt="Logo Ufba"
          src="https://www.ufba.br/sites/portal.ufba.br/files/brasao_ufba.jpg"
        />
      </div>
      <div className="column right">
        <h1>Login</h1>
        <form onSubmit={submitForm} noValidate>
          <div className="form-control">
            <label>Usuário</label>
            <input
              name="username"
              type="text"
              required
              placeholder="Usuário"
              value={state.userInfo.email}
              onChange={onChangeValue}
            />
          </div>
          <div className="form-control">
            <label>Senha</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Digite sua senha"
              value={state.userInfo.password}
              onChange={onChangeValue}
            />
          </div>
          {errorMsg}
          {successMsg}
          <div className="form-control">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="_navBtn">
          <button onClick={toggleNav}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
