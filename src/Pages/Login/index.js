import React, { useState } from "react";
// import logo from "./../../logo.svg";
import "./styles.css";
//import Container from "@material-ui/core/Container";
import { Button, Input } from "@material-ui/core";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  
  const [auth, setAuth] = useState()

  const onSubmit = () => {
    if(!username || !password ) {
      alert("Preencha todos os dados")
      return
    }

    postUser()
  }

  const postUser = async () => {
      const userinfo = {
        "username": username,
        "password": password
      }

      const res = await axios.post(`http://34.95.255.198/index.php/login`, userinfo);
      console.log(res.data)
      // TODO tratar o token de autenticação
    }

  return (
    <div className="App">
        <div className="column">
          <img  width="70%" height="70%" alt="Logo Ufba" src="https://www.ufba.br/sites/portal.ufba.br/files/brasao_ufba.jpg" />
        </div>
        <form className="column">
          <h1>ACESSO AO SISTEMA</h1>
          <h2>Usuário:</h2>
          <div> 
            <Input onChange={e => setUsername(e.target.value)} label="Usuário"/> 
          </div>

          <h2>Senha:</h2>
          <div> 
            <Input onChange={e => setPassword(e.target.value)} label="Senha" /> 
          </div>

          <Button onClick={() => onSubmit()}>LOGIN</Button>
        </form>
    </div>
  );
}
export default Login;
