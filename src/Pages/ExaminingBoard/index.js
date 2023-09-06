import React, { useState } from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { TextField, Radio, Select } from "final-form-material-ui";
import {
  Grid,
  Button,
  CssBaseline,
  MenuItem,
  ThemeProvider,
} from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import api from "Config/http";

/*
  Componente responsável pela página de criação de bancas
*/

function ExaminingBoard() {
  //
  const [loading, setLoading] = useState(false);
  const [tipo_banca, setTipo_banca] = useState(true);
  const history = useHistory();

  const goToDashboard = () => {
    let path = `dashboard`;
    history.push(path);
  };

  function DatePickerWrapper(props) {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;
    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched;

    return (
      <DatePicker
        {...rest}
        name={name}
        format="dd/MM/yyyy"
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        value={value === "" ? null : value}
      />
    );
  }

  function TimePickerWrapper(props) {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;
    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched;

    return (
      <TimePicker
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        value={value === "" ? null : value}
      />
    );
  }

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#329F5B",
        dark: "#184e2d",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#6c7ae0",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "remoto") {
      setTipo_banca(false);
    } else if (value === "local") {
      setTipo_banca(true);
    }
  };

  const onSubmit = async (values) => {
    const hour = new Date(values.hora);
    const date = new Date(values.data_realizacao);
    if (values["curso"] === "BCC") {
      values.disciplina = "MATA67";
    } else if (values["curso"] === "BSI") {
      values.disciplina = "MATC98";
    }
    const userId = localStorage.getItem("userId");
    values.user_id = userId;
    hour.setHours(hour.getHours() - 3);
    hour.setDate(date.getDate());
    hour.setMonth(date.getMonth());
    hour.setFullYear(date.getFullYear());
    values.data_realizacao = hour.toISOString().slice(0, 19).replace("T", " ");
    setLoading(true);

    api
      .post("/banca", values)
      .then(function (response) {
        setLoading(false);
        goToDashboard();
      })
      .catch((error) => {
        setLoading(false);
        alert("Ocorreu um erro ao tentar cadastrar a banca");
        goToDashboard();
      });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.titulo_trabalho) {
      errors.titulo_trabalho = "Obrigatório";
    }
    if (!values.resumo) {
      errors.resumo = "Obrigatório";
    }
    if (!values.abstract) {
      errors.abstract = "Obrigatório";
    }
    if (!values.palavras_chave) {
      errors.palavras_chave = "Obrigatório";
    }
    if (!values.data_realizacao) {
      errors.data_realizacao = "Obrigatório";
    }
    if (!values.hora) {
      errors.hora = "Obrigatório";
    }
    if (!values.local) {
      errors.local = "Obrigatório";
    }
    if (!values.curso) {
      errors.curso = "Obrigatório";
    }
    if (!values.tipo_banca) {
      errors.tipo_banca = "Obrigatório";
    }
    if (!values.autor) {
      errors.autor = "Obrigatório";
    }
    if (values.pronome_autor !== 0 && !values.pronome_autor) {
      errors.pronome_autor = "Obrigatório";
    }
    if (!values.turma) {
      errors.turma = "Obrigatório";
    }
    if (!values.ano) {
      errors.ano = "Obrigatório";
    }
    if (!values.semestre_letivo) {
      errors.semestre_letivo = "Obrigatório";
    }
    if (!values.matricula) {
      errors.matricula = "Obrigatório";
    }
    return errors;
  };

  const styles = makeStyles({
    root: {
      boxShadow: "0 0 4px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 20%)",
      padding: "16px",
    },
  });

  const classesGrid = styles();

  return (
    <Container className="App banca-form-container">
      {loading ? (
        <div className="center">
          <ReactLoading
            type={"spin"}
            color={"#41616c"}
            height={50}
            width={50}
          />
        </div>
      ) : null}
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          maxWidth: 3000,
        }}
      >
        <CssBaseline />
        <h2 className="banca-form-header">Adicionar nova banca</h2>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
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
                    multiline
                    name="titulo_trabalho"
                    component={TextField}
                    type="text"
                    label="Titulo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    Obrigatório
                    multiline
                    name="resumo"
                    component={TextField}
                    type="text"
                    label="Resumo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="abstract"
                    fullWidth
                    multiline
                    Obrigatório
                    component={TextField}
                    label="Abstract"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="autor"
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label="Autor"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="matricula"
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label="Matrícula"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={Select}
                    label="Pronome"
                    name="pronome_autor"
                    formControlProps={{ className: "curso" }}
                  >
                    <MenuItem value="0" alignItems="flex-start">
                      Ele/dele
                    </MenuItem>
                    <MenuItem value="1" alignItems="flex-start">
                      Ela/dela
                    </MenuItem>
                    <MenuItem value="2" alignItems="flex-start">
                      Elu/delu
                    </MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="palavras_chave"
                    fullWidth
                    Obrigatório
                    multiline
                    component={TextField}
                    label="Palavras Chave (Separadas por vírgula)"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="turma"
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label="Turma"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="curso"
                    label="Curso"
                    formControlProps={{ className: "curso" }}
                    component={Select}
                  >
                    <MenuItem value={"BCC"}>BCC</MenuItem>
                    <MenuItem value={"BSI"}>BSI</MenuItem>
                  </Field>
                </Grid>
                <Grid
                  style={{ padding: 0, marginTop: "auto", fontSize: "13px" }}
                  item
                  xs={2}
                >
                  Remoto
                  <Field
                    name="tipo_banca"
                    component={Radio}
                    type="radio"
                    value="remoto"
                    onClick={handleChange}
                  ></Field>
                  Presencial
                  <Field
                    name="tipo_banca"
                    component={Radio}
                    type="radio"
                    value="local"
                    onClick={handleChange}
                  ></Field>
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="ano"
                    multiline
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label="Ano"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="semestre_letivo"
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label="Semestre Letivo"
                    type="number"
                    InputProps={{
                      inputProps: { min: 1, max: 9, type: "number" },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="local"
                    multiline
                    fullWidth
                    Obrigatório
                    component={TextField}
                    label={tipo_banca ? "Local" : "Link"}
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <Field
                      name="data_realizacao"
                      component={DatePickerWrapper}
                      Obrigatório
                      fullWidth
                      margin="normal"
                      label="Data"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="hora"
                      Obrigatório
                      component={TimePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Hora"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item style={{ marginTop: 16 }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      style={{ borderRadius: 10 }}
                    >
                      Adicionar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="button"
                      disabled={submitting}
                      onClick={goToDashboard}
                      style={{ marginLeft: 10, borderRadius: 10 }}
                    >
                      Voltar
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
export default ExaminingBoard;
