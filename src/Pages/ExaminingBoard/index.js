import React from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
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

  const onSubmit = async (values) => {
    var hour = new Date(values.hora);
    var date = new Date(values.data_realizacao);
    const loginToken = localStorage.getItem("loginToken");

    hour.setHours(hour.getHours() - 3);
    hour.setDate(date.getDate());
    hour.setMonth(date.getMonth());
    hour.setFullYear(date.getFullYear());
    hour = hour.toISOString();
    values.data_realizacao = hour;
    await axios({
      method: "post",
      url: `https://organizacao-de-defesas.herokuapp.com/banca`,
      data: getFormData(values),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      goToDashboard();
    });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.titulo_trabalho) {
      errors.titulo_trabalho = "Required";
    }
    if (!values.resumo) {
      errors.resumo = "Required";
    }
    if (!values.abstract) {
      errors.abstract = "Required";
    }
    if (!values.palavras_chave) {
      errors.palavras_chave = "Required";
    }
    if (!values.data_realizacao) {
      errors.data_realizacao = "Required";
    }
    if (!values.hora) {
      errors.hora = "Required";
    }
    if (!values.local) {
      errors.local = "Required";
    }
    if (!values.tipo_banca) {
      errors.tipo_banca = "Required";
    }
    return errors;
  };

  return (
    <Container className="App">
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
                      required
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
                      required
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
                      required
                      component={TextField}
                      label="Abstract"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="palavras_chave"
                      fullWidth
                      required
                      multiline
                      component={TextField}
                      label="Palavras Chave (Separadas por vírgula)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="tipo_banca"
                      multiline
                      fullWidth
                      required
                      component={TextField}
                      label="Tipo da defesa"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="local"
                      multiline
                      fullWidth
                      required
                      component={TextField}
                      label="Local ou link"
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={6}>
                      <Field
                        name="data_realizacao"
                        component={DatePickerWrapper}
                        required
                        fullWidth
                        margin="normal"
                        label="Data"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="hora"
                        required
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
