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
import { useLocation } from "react-router-dom/cjs/react-router-dom";
// Picker

/*
  Componente responsável pela página de registro de usuários
*/

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Register() {
  const { registerUser } = useContext(MyContext);
  const query = useQuery();

  const initialState = {
    userInfo: {
      nome: "",
      email: "",
      username: "",
      password: "",
      academic_title: "",
      universidade: "",
      pronoun: "",
      registration_id: "",
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
    event.hash = query.get("inv");
    await registerUser(event);
    goToHome();
  };

  const validate = (values) => {
    const REQUIRED_FIELDS_VALIDATION = [
      "nome",
      "pronoun",
      "email",
      "username",
      "password",
      "universidade",
    ];

    const FIELD_LENGHT_VALIDATION = {
      nome: 255,
      email: 64,
      username: 255,
      password: 16,
      universidade: 64,
      registration_id: 9,
    };

    const errors = {};

    REQUIRED_FIELDS_VALIDATION.forEach((field) => {
      if (!values[field]) errors[field] = "Obrigatório";
    });

    Object.keys(FIELD_LENGHT_VALIDATION).forEach((key) => {
      if (values[key] && values[key].length > FIELD_LENGHT_VALIDATION[key])
        errors[
          key
        ] = `O tamanho máximo deste campo é de ${FIELD_LENGHT_VALIDATION[key]} caracteres.`;
    });

    if (!query.get("inv") && !values.registration_id) {
      errors.registration_id = "Obrigatório";
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
                    label="Nome completo"
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
                    name="universidade"
                    value={state.userInfo.universidade}
                    component={TextField}
                    type="text"
                    label="Universidade"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    multiline
                    name="academic_title"
                    value={state.userInfo.academic_title}
                    component={TextField}
                    type="text"
                    label="Título acadêmico"
                    placeholder="Exemplo: Doutor, Mestre, Bacharel.."
                  />
                </Grid>
                {!query.get("inv") && (
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      multiline
                      name="registration_id"
                      value={state.userInfo.registration_id}
                      component={TextField}
                      type="text"
                      label="Matrícula"
                    />
                  </Grid>
                )}
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
