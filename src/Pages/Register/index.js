import React, { useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";

function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      nome: "",
      email: "",
      username: "",
      password: "",
      academic_title: "",
      universidade: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  const history = useHistory();

  const goToLogin = () => {
    let path = `login`;
    history.push(path);
  }

  // On Submit the Registration Form
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    goToLogin();
  };

  // On change the Input Value (name, email, password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Show Message on Success or Error
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
        <h1>Registre-se</h1>
        <form onSubmit={submitForm} noValidate>
          <div className="form-control">
            <label>Nome Completo</label>
            <input
              name="nome"
              required
              type="text"
              value={state.userInfo.nome}
              onChange={onChangeValue}
              placeholder="Insira seu nome"
            />
            <p></p>
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              name="email"
              required
              type="email"
              value={state.userInfo.email}
              onChange={onChangeValue}
              placeholder="Insira seu email"
            />
            <p></p>
          </div>
          <div className="form-control">
            <label>Username</label>
            <input
              name="username"
              required
              type="username"
              value={state.userInfo.username}
              onChange={onChangeValue}
              placeholder="Insira seu username"
            />
            <p></p>
          </div>
          <div className="form-control">
            <label>Senha</label>
            <input
              name="password"
              required
              type="password"
              value={state.userInfo.password}
              onChange={onChangeValue}
              placeholder="Insira sua senha"
            />
            <p></p>
          </div>
          <div className="form-control">
            <label>Universidade</label>
            <input
              name="universidade"
              required
              type="universidade"
              value={state.userInfo.universidade}
              onChange={onChangeValue}
              placeholder="Insira sua universidade"
            />
            <p></p>
          </div>
          {errorMsg}
          {successMsg}
          <div className="form-control">
            <button type="submit" onClick={submitForm}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
