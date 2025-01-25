import React, { useContext, useState, useCallback, useMemo } from "react";
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
import * as Yup from "yup"; 

const yupSync = (schema) => async (values) => {
  try {
    await schema.validate(values, { abortEarly: false }); 
    return {};
  } catch (error) {
    return error.inner.reduce((errors, err) => {
      errors[err.path] = err.message; 
      return errors;
    }, {});
  }
};

// validação Yup 
const validationSchema = Yup.object().shape({
  nome: Yup.string().max(255, "Máximo de 255 caracteres").required("Obrigatório"),
  email: Yup.string()
    .email("Email inválido") 
    .max(64, "Máximo de 64 caracteres")
    .required("Obrigatório"),
  username: Yup.string().max(255, "Máximo de 255 caracteres").required("Obrigatório"),
  password: Yup.string()
    .min(6, "Mínimo de 6 caracteres") 
    .max(16, "Máximo de 16 caracteres")
    .required("Obrigatório"),
  universidade: Yup.string().max(64, "Máximo de 64 caracteres").required("Obrigatório"),
  pronoun: Yup.string().required("Obrigatório"),
  registration_id: Yup.string()
    .max(9, "Máximo de 9 caracteres")
    .when("$requiresRegistrationId", {
      is: true,
      then: (schema) => schema.required("Obrigatório"),
    }),
});

function Register() {
  const { registerUser } = useContext(MyContext);
  const query = useQuery();
  const history = useHistory();

  const validate = useMemo(() => yupSync(validationSchema), []);

  const [state, setState] = useState({
    errorMsg: "",
    successMsg: "",
  });

  const goToHome = useCallback(() => {
    history.push("");
  }, [history]);

  const checkUserExist = async (email) => {
    try {
      const response = await fetch(`/api/checkUser?email=${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        console.error(`Erro na resposta da API: ${response.status}`);
        return false;
      }
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      return false;
    }
  };

  // Função para submeter o formulário
  const submitForm = async (values) => {
    values.hash = query.get("inv");
    try {
      const userExists = await checkUserExist(values.email);
      if (userExists) {
        setState({ errorMsg: "Usuário já existe", successMsg: "" });
        alert("Usuário já existe!");
        return;
      }
      await registerUser(values);
      setState({ errorMsg: "", successMsg: "Usuário cadastrado com sucesso" });
      alert("Usuário cadastrado com sucesso!");
      goToHome();
    } catch (error) {
      setState({ errorMsg: "Erro ao cadastrar usuário", successMsg: "" });
      alert("Erro ao cadastrar! Tente novamente.");
      console.error("Erro:", error);
    }
  };

  // Estilos do botão
  const themeButton = createTheme({
    palette: { primary: { main: "#329F5B" } },
  });

  const styles = makeStyles({
    root: {
      boxShadow: "0 0 4px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 20%)",
      padding: "16px",
      "& .MuiFormControl-root": { display: "flex" },
      "& .MuiSelect-select.MuiSelect-select": { textAlign: "left" },
    },
  });
  const classesGrid = styles();

  return (
    <Container className="App">
      <div style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
        <CssBaseline />
        <Form
          onSubmit={submitForm}
          initialValues={{}}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={2} className={classesGrid.root}>
                <Grid item xs={12}>
                  <Field fullWidth name="nome" component={TextField} type="text" label="Nome completo" />
                </Grid>
                <Grid item xs={12}>
                  <Field name="pronoun" component={Select} label="Gênero">
                    <MenuItem value="0">Masculino</MenuItem>
                    <MenuItem value="1">Feminino</MenuItem>
                    <MenuItem value="2">Outro</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field fullWidth name="email" component={TextField} type="text" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <Field fullWidth name="universidade" component={TextField} type="text" label="Universidade" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="academic_title"
                    component={TextField}
                    type="text"
                    label="Título acadêmico"
                    placeholder="Exemplo: Doutor, Mestre, Bacharel..."
                  />
                </Grid>
                {!query.get("inv") && (
                  <Grid item xs={12}>
                    <Field fullWidth name="registration_id" component={TextField} type="text" label="Matrícula" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Field fullWidth name="username" component={TextField} type="text" label="Username" />
                </Grid>
                <Grid item xs={12}>
                  <Field fullWidth name="password" component={TextField} type="password" label="Senha" />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <ThemeProvider theme={themeButton}>
                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
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
