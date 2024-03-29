import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Grid, Button, CssBaseline } from "@material-ui/core";
import api from "Config/http";
import "./styles.css";

/*
  Componente responsável pela página de registro de usuários
*/

function Register() {
  const [done, setDone] = useState(false);
  const [hash, setHash] = useState("");

  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("");
  }, [history]);

  const themeButton = createTheme({
    palette: {
      primary: {
        main: "#329F5B",
      },
    },
  });

  const styles = makeStyles({
    root: {
      boxShadow: "0 0 4px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 20%)",
      padding: "16px",
    },
  });

  const classesGrid = styles();

  const generateLink = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", values.email);
    bodyFormData.append("reset_password_hash", Math.random());

    api
      .post("/reset-password", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then(function (response) {
        alert("O Email de redefinição de senha foi enviado");
        goToHome();
        // reload();
      })
      .catch(function (error) {
        // setLoading(false);
        alert("Ocorreu um erro ao tentar enviar o email");
        goToHome();
      });
  };
  const changePassword = async (values) => {
    var bodyFormData = new FormData();
    bodyFormData.append("new_password", values.password);
    bodyFormData.append("hash", hash);
    // setDone(false);
    api
      .post("/reset-password/reset", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then(function (response) {
        alert("Senha redefinida com sucesso!");
        goToHome();
        // reload();
      })
      .catch(function (error) {
        // setLoading(false);
        alert("Ocorreu um erro ao tentar redefinir a senha");
        goToHome();
      });
  };
  useEffect(() => {
    setTimeout(async () => {
      let url = window.location.href;
      let regex = /[?&]([^=#]+)=([^&#]*)/g,
        hash = "",
        match;
      match = regex.exec(url);
      if (match == null) {
        setHash(false);
        setDone(true);
      } else {
        hash = match[2];
        api
          .get(`/reset-password/${hash}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then(function (response) {
            if (response.data.data === true) {
              setHash(hash);
              setDone(true);
            } else {
              alert("O link que você tentou acessar é inválido.");
              goToHome();
            }
          });
      }
    }, 0);
  }, [goToHome]);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Obrigatório";
    }
    return errors;
  };

  const validate2 = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Obrigatório";
    }
    if (values.password2 !== values.password) {
      errors.password2 = "As senhas não coincidem";
    }
    return errors;
  };

  return (
    <>
      {!done ? (
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
            {!hash ? (
              <Form
                onSubmit={generateLink}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid
                      container
                      alignItems="flex-start"
                      spacing={2}
                      className={classesGrid.root}
                    >
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          Obrigatório
                          name="email"
                          component={TextField}
                          type="text"
                          label="Email"
                        />
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <ThemeProvider theme={themeButton}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={submitting}
                            style={{ borderRadius: 10 }}
                          >
                            Enviar email de redefinição de senha
                          </Button>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            ) : (
              <div>
                <Form
                  onSubmit={changePassword}
                  initialValues={{}}
                  validate={validate2}
                  render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <Grid
                        container
                        alignItems="flex-start"
                        spacing={2}
                        className={classesGrid.root}
                      >
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            Obrigatório
                            name="password"
                            component={TextField}
                            type="password"
                            label="Digite a nova senha"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            Obrigatório
                            name="password2"
                            component={TextField}
                            type="password"
                            label="Digite a nova senha novamente"
                          />
                        </Grid>
                        <Grid item style={{ marginTop: 16 }}>
                          <ThemeProvider theme={themeButton}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              disabled={submitting}
                              style={{ borderRadius: 10 }}
                            >
                              Redefinir senha
                            </Button>
                          </ThemeProvider>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                />
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default Register;
