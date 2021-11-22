import React, { useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Container from "@material-ui/core/Container";

import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
// Picker

/*
  Componente responsável pela página de registro de usuários
*/

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

  const goToHome = () => {
    let path = ``;
    history.push(path);
  };

  // On Submit the Registration Form
  const submitForm = async (event) => {
    // event.preventDefault();
    const data = await registerUser(event);
    goToHome();
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

  const validate = (values) => {
    const errors = {};
    if (!values.nome) {
      errors.nome = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.universidade) {
      errors.universidade = "Required";
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
          render={({
            handleSubmit,
            submitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="nome"
                      value={state.userInfo.nome}
                      component={TextField}
                      type="text"
                      label="Nome"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
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
                      required
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
                      required
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
                      required
                      multiline
                      name="universidade"
                      value={state.userInfo.universidade}
                      component={TextField}
                      type="text"
                      label="Universidade"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}
        />
      </div>
    </Container>
  );
}

export default Register;
