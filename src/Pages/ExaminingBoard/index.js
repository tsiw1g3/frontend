import React, {useState} from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { withStyles} from '@material-ui/core/styles';
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline, InputLabel, MenuItem } from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";

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

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const handleChange = e => {
    const { value } = e.target;
    if(value == "remoto"){
      setTipo_banca(false);
    }
    else if(value == "local"){
      setTipo_banca(true);
    }
  };

  const onSubmit = async (values) => {
    var hour = new Date(values.hora);
    var date = new Date(values.data_realizacao);
    if(values['curso'] == 'BCC'){
      values.disciplina = 'MATA67';
    }
    else if(values['curso'] == 'BSI'){
      values.disciplina = 'MATC98';
    }
    const loginToken = localStorage.getItem("loginToken");
    const userId = localStorage.getItem("userId");
    values.user_id = userId;
    hour.setHours(hour.getHours() - 3);
    hour.setDate(date.getDate());
    hour.setMonth(date.getMonth());
    hour.setFullYear(date.getFullYear());
    hour = hour.toISOString();
    values.data_realizacao = hour;
    setLoading(true);
    await axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/banca`,
      data: getFormData(values),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    })
    .then(function (response) {
      setLoading(false);
      goToDashboard();
    })
    .catch(error => {
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

  return (
    <Container className="App">
      {loading ? (
        <div className="center">
        <ReactLoading
          type={"spin"}
          color={"#41616c"}
          height={50}
          width={50}
        />
      </div>
      ) : (null)
      }
      <div style={{ padding: 16, margin: "auto", maxWidth: 2000 }}>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
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
                  <Grid item xs={6}>
                    <Field
                      name="matricula"
                      fullWidth
                      Obrigatório
                      component={TextField}
                      label="Matrícula"
                    />
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
                        formControlProps={{className: 'curso'}}
                        component={Select}
                    >
                        <MenuItem value={"BCC"}>BCC</MenuItem>
                        <MenuItem value={"BSI"}>BSI</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={2}>
                    Remoto
                    <Field name="tipo_banca" component={Radio} type="radio" value="remoto" onClick={handleChange}></Field>
                    Local
                    <Field name="tipo_banca" component={Radio} type="radio" value="local" onClick={handleChange}></Field>
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
                      InputProps={{ inputProps: { min: 1, max: 9, type: 'number' } }}
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
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Adicionar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      disabled={submitting}
                      onClick={goToDashboard}
                    >
                      Voltar
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
export default ExaminingBoard;
