import React, { useContext, useState, useCallback } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { Grid, Button, CssBaseline, MenuItem } from "@material-ui/core";
// Picker

/*
  Componente responsável pela página de registro de usuários
*/

function Register() {
  const { registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      nome: "",
      email: "",
      username: "",
      password: "",
      academic_title: "",
      universidade: "",
      pronoun: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state] = useState(initialState);

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
      "& .MuiFormControl-root": {
        display: "flex",
      },
      "& .MuiSelect-select.MuiSelect-select": {
        textAlign: "left",
      },
    },
  });

  const classesGrid = styles();

  const submitForm = async (event) => {
    // Pass url hash to submit values.
    await registerUser(event);
    goToHome();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nome) {
      errors.nome = "Obrigatório";
    }
    if (!values.pronoun) {
      errors.pronoun = "Obrigatório";
    }
    if (!values.email) {
      errors.email = "Obrigatório";
    }
    if (!values.username) {
      errors.username = "Obrigatório";
    }
    if (!values.password) {
      errors.password = "Obrigatório";
    }
    if (!values.universidade) {
      errors.universidade = "Obrigatório";
    }
    return errors;
  };

  return (
    <Container className="App">
      <div style={{ padding: 16, margin: "auto", maxWidth: 2000 }}>
        <CssBaseline />
        <Form
          onSubmit={submitForm}
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
                    name="nome"
                    value={state.userInfo.nome}
                    component={TextField}
                    type="text"
                    label="Nome Completo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="pronoun"
                    value={state.userInfo.pronoun}
                    component={Select}
                    label="Gênero"
                  >
                    <MenuItem value="0" alignItems="flex-start">
                      Masculino
                    </MenuItem>
                    <MenuItem value="1" alignItems="flex-start">
                      Feminino
                    </MenuItem>
                    <MenuItem value="2" alignItems="flex-start">
                      Outro
                    </MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    multiline
                    name="email"
                    value={state.userInfo.email}
                    component={TextField}
                    type="text"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    multiline
                    name="username"
                    value={state.userInfo.username}
                    component={TextField}
                    type="text"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    name="password"
                    value={state.userInfo.password}
                    component={TextField}
                    type="password"
                    label="Senha"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    multiline
                    name="universidade"
                    value={state.userInfo.universidade}
                    component={TextField}
                    type="text"
                    label="Universidade"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <ThemeProvider theme={themeButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Registrar
                    </Button>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </Container>
  );
}

export default Register;
