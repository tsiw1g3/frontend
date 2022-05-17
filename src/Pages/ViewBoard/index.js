import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline, MenuItem } from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";

/*
  Componente responsável pela página de visualização de bancas
*/

function ViewBoard() {
  const banca = JSON.parse(localStorage.getItem("banca"));
  banca.data_realizacao = new Date(banca.data_realizacao);
  // banca.data_realizacao = banca.data_realizacao.toISOString();
  const userId = localStorage.getItem("userId");
  const loginToken = localStorage.getItem("loginToken");

  const [nota, setNota] = useState([]);
  const [idUb, setIdUb] = useState([]);
  const [role, setRole] = useState([]);
  const [done, setDone] = useState(undefined);
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

  function encode(details) {
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  }

  const onSubmit = async (values) => {
    var hour = new Date(values.hora);
    var date = new Date(values.data_realizacao);
    const loginToken = localStorage.getItem("loginToken");
    if(values['curso'] == 'BCC'){
      values.disciplina = 'MATA67';
    }
    else if(values['curso'] == 'BSI'){
      values.disciplina = 'MATC98';
    }

    hour.setHours(hour.getHours() - 3);
    hour.setDate(date.getDate());
    hour.setMonth(date.getMonth());
    hour.setFullYear(date.getFullYear());
    values.data_realizacao = hour.toISOString();
    axios({
      method: "put",
      url: `https://sistema-de-defesa.herokuapp.com/banca/${banca.id}`,
      data: encode(values),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      goToDashboard();
    });

    // if (role != "aluno") {
    //   var details = { nota: parseFloat(values.nota) };
    //   axios({
    //     method: "put",
    //     url: `https://sistema-de-defesa.herokuapp.com/usuario-banca/${idUb}`,
    //     data: encode(details),
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: loginToken,
    //       Accept: "application/json",
    //     },
    //   }).then(function (response) {
    //     return response;
    //   });
    // }
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

  const handleChange = e => {
    const { value } = e.target;
    if(value == "remoto"){
      setTipo_banca(false);
    }
    else if(value == "local"){
      setTipo_banca(true);
    }
  };

  const generateReport = async () => {
    fetch(
      `https://sistema-de-defesa.herokuapp.com/documento/${banca.id}`,
      {
        method: "GET",
        headers: {
          Authorization: loginToken,
        },
      }
    ) // FETCH BLOB FROM IT
      .then((response) => response.blob())
      .then((blob) => {
        // RETRIEVE THE BLOB AND CREATE LOCAL URL
        setDone(true);
        var _url = window.URL.createObjectURL(blob);
        window.open(_url, "_blank").focus(); // window.open + focus
      })
      .catch((err) => {
        setDone(true);
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
        axios({
          method: "get",
          url: `https://sistema-de-defesa.herokuapp.com/nota/${banca.id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: loginToken,
            Accept: "application/json",
          },
        }).then(function (response) {
          setNota(response.data.data || "");
          setDone(true);
          return response;
        });
    }, 0);
  }, []);

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
            <Form
              onSubmit={onSubmit}
              initialValues={{
                titulo_trabalho: banca.titulo_trabalho,
                resumo: banca.resumo,
                abstract: banca.abstract,
                palavras_chave: banca.palavras_chave,
                local: banca.local,
                data_realizacao: banca.data_realizacao,
                hora: banca.data_realizacao,
                nota: nota,
                nota_nao_alteravel: nota,
                curso: banca.curso,
                autor: banca.autor,
                turma: banca.turma,
                disciplina: banca.disciplina,
                tipo_banca: banca.tipo_banca,
                matricula: banca.matricula,
                ano: banca.ano,
                semestre_letivo: banca.semestre_letivo,
              }}
              validate={validate}
              render={({
                handleSubmit,
                reset,
                submitting,
                pristine,
                values,
              }) => (
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
                        <Field name="tipo_banca" component={Radio} type="radio" value="remoto" onClick={handleChange} checked={!tipo_banca}></Field>
                        Local
                        <Field name="tipo_banca" component={Radio} type="radio" value="local" onClick={handleChange} checked={tipo_banca}></Field>
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
                          component={TextField}
                          Obrigatório
                          multiline
                          label="Local ou link"
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
                          <Grid item xs={12}>
                            <Field
                              name="nota_nao_alteravel"
                              disabled
                              fullWidth
                              component={TextField}
                              label="Nota Final"
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
                          Editar
                        </Button>
                        {role == "orientador" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setDone(false);
                              generateReport();
                            }}
                          >
                            Gerar relatório
                          </Button>
                        ) : (
                          <span></span>
                        )}
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
      )}
    </>
  );
}
export default ViewBoard;
