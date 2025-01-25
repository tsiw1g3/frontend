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
import { useQuery } from "Hooks/Helpers/useQuery";
import { toast } from "react-toastify";
import { isEmailValid } from "Helpers/validators";

import ReactLoading from "react-loading";

// Picker

/*
  Componente responsável pela página de registro de usuários
*/

function Register() {
  const { registerUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
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
  const [state, setState] = useState(initialState);

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

  //verificação de usuario
  const ckeckUserExist = async (email) => {
    //colocar rota do backend
    const response = await fetch(`/api/checkUser?email=${email}`);
    const data = await response.json();
    return data.exists;
  };

  const submitForm = async (event) => {
    event.hash = query.get("inv");
    setLoading(true);

    try {
      const userExists = await ckeckUserExist(event.email);
      if (userExists) {
        setState((prevState) => ({
          ...prevState,
          errorMsg: "Usuario existente",
          successMsg: "",
        }));

        toast.error(
          "Já existe um usuário cadastrado com este e-mail no sistema!"
        );
        setLoading(false);
        return;
      }

      setState((prevState) => ({
        ...prevState,
        erroMsg: "",
        successMsg: "Usuario cadastrado com sucesso",
      }));

      setLoading(false);
      toast.success("Usúario cadastrado com sucesso !");
      goToHome();
    } catch (error) {
      setLoading(false);
      toast.error(
        "Não foi possível finalizar o cadastro com os dados informados. Tente novamente mais tarde."
      );
      setState((prevState) => ({
        ...prevState,
        errorMsg: "error ao cadastrar usuario,tente novamente",
        successMsg: "",
      }));
    }

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

    if (values.email && !isEmailValid(values.email))
      errors.email = "Insira um e-mail válido";

    return errors;
  };

  return (
    <Container className="App">
      {loading ? (
        <div className="center">
          <ReactLoading
            type={"spin"}
            color={"#41616c"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div style={{ padding: 16, margin: "auto", maxWidth: 2000 }}>
          <CssBaseline />
          <Form
            onSubmit={submitForm}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit }) => (
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
                      <Button variant="contained" color="primary" type="submit">
                        Registrar
                      </Button>
                    </ThemeProvider>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </div>
      )}
    </Container>
  );
}

export default Register;
