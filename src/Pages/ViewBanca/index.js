import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline, MenuItem } from "@material-ui/core";

/*
  Componente responsável pela página de visualização de bancas
*/

function ViewBanca() {
  const history = useHistory();
  const [banca, setBanca] = useState([]);
  const [inn, setInn] = useState([]);
  const [done, setDone] = useState(false);
  const [done2, setDone2] = useState(false);
  const [date, setDate] = useState('')

  const loginToken = localStorage.getItem("loginToken");
  const goToHome = () => {
    let path = ``;
    history.push(path);
  };

  useEffect(() => {
    setTimeout(async () => {
      let url = window.location.href;
      let regex = /[?&]([^=#]+)=([^&#]*)/g,
      banca = '',
      match
      match = regex.exec(url);
      if(match == null){
        goToHome();
      }
      banca = match[2];
      const users = await axios({
        method: "get",
        url: `https://sistema-de-defesa.herokuapp.com/banca/${banca}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }).then(function (response) {
        if(response.data.data != null){
          let data = new Date(response.data.data.data_realizacao);
          data.setSeconds(0);
          setDate(data.toLocaleString("pt-BR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }));
          setBanca(response.data.data);
          setDone(true);
        }
        else{
          goToHome();
        }
      });
    }, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      let url = window.location.href;
      let regex = /[?&]([^=#]+)=([^&#]*)/g,
      banca = '',
      match
      match = regex.exec(url);
      if(match == null){
        goToHome();
      }
      banca = match[2];
      const users = axios({
        method: "get",
        url:
          "https://sistema-de-defesa.herokuapp.com/usuario-banca/usuarios/" +
          banca,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        console.log(response.data.data);
        setInn(response.data.data);
        setDone2(true);
      }).catch(function (error){
        setDone2(true);
      });
    }, 0);
  }, []);

  return (
    <>
      {!done && !done2 ? (
          <div className="center">
            <ReactLoading
              type={"spin"}
              color={"#41616c"}
              height={100}
              width={100}
            />
          </div>
        ) : (
        <Container className="App">
          <div style={{ padding: 16, margin: "auto", maxWidth: 2000 }}>
            <CssBaseline />
            <Paper style={{ padding: 16 }}>
              <div className="banca-content">
                <h1>Título: {banca.titulo_trabalho}</h1>
              </div>
              <Grid container justifyContent="flex-start">
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Resumo: </strong> {banca.resumo}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Abstract: </strong> {banca.abstract}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Autor: </strong>{banca.autor}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Matrícula: </strong>{banca.matricula}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Palavras Chaves (Separadas por vírgula): </strong>{banca.palavras_chave}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Turma: </strong>{banca.turma}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Curso: </strong>{banca.curso}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Ano: </strong>{banca.ano}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Semestre Letivo: </strong>{banca.semestre_letivo}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Local: </strong>{banca.local}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <div className="banca-content">
                    <span><strong>Data e hora: </strong>{date}</span>
                  </div>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  {inn.length > 0 ? (
                    <div className="banca-content"><strong>Banca avaliadora:</strong></div>
                  ):(null)
                  }
                  {inn && inn.length > 0 ? (
                    inn.map((user) => (
                      <div className="banca-content">
                        <span>{user.nome}</span>
                      </div>
                    ))
                  ) : (
                    <div className="banca-content"><strong>Banca avaliadora pendente</strong></div>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Container>
        )}
    </>
  );
}
export default ViewBanca;
