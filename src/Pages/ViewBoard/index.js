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

    hour.setHours(hour.getHours() - 3);
    hour.setDate(date.getDate());
    hour.setMonth(date.getMonth());
    hour.setFullYear(date.getFullYear());
    values.data_realizacao = hour.toISOString();
    axios({
      method: "put",
      url: `https://organizacao-de-defesas.herokuapp.com/banca/${banca.id}`,
      data: encode(values),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      goToDashboard();
    });

    if (role != "aluno") {
      var details = { nota: parseFloat(values.nota) };
      axios({
        method: "put",
        url: `https://organizacao-de-defesas.herokuapp.com/usuario-banca/${idUb}`,
        data: encode(details),
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        return response;
      });
    }
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
    if (!values.local) {
      errors.local = "Required";
    }
    if (!values.tipo_banca) {
      errors.tipo_banca = "Required";
    }
    if (!values.curso) {
      errors.curso = "Required";
    }
    if (!values.disciplina) {
      errors.disciplina = "Required";
    }
    if (!values.autor) {
      errors.autor = "Required";
    }
    return errors;
  };

  const generateReport = async () => {
    fetch(
      `https://organizacao-de-defesas.herokuapp.com/documento/${banca.id}`,
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
        url: `https://organizacao-de-defesas.herokuapp.com/usuario-banca/id/${banca.id}/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setRole(response.data.data.role);
        setIdUb(response.data.data.id);

        if (response.data.data.role == "aluno") {
          axios({
            method: "get",
            url: `https://organizacao-de-defesas.herokuapp.com/nota/${banca.id}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: loginToken,
              Accept: "application/json",
            },
          }).then(function (response) {
            setNota(response.data.data || "");
            setDone(true);
          });
        } else {
          // setNota(response.data.data.toString());
          setNota(response.data.data.nota || "");
          setDone(true);
        }
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
                tipo_banca: banca.tipo_banca,
                curso: banca.curso,
                autor: banca.autor,
                disciplina: banca.disciplina
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
                    <div className="cargo">Cargo: {role}</div>
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
                          name="autor"
                          fullWidth
                          required
                          component={TextField}
                          label="Autor"
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
                      <Grid item xs={8}>
                        <Field
                          name="tipo_banca"
                          multiline
                          fullWidth
                          required
                          component={TextField}
                          label="Tipo da defesa"
                        />
                      </Grid>
                      <Grid item xs={2}>
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
                        <Field
                            name="disciplina"
                            label="Disciplina"
                            formControlProps={{className: 'disciplina'}}
                            component={Select}
                        >
                            <MenuItem value={"MATA67"}>MATA67</MenuItem>
                            <MenuItem value={"MATC98"}>MATC98</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="local"
                          multiline
                          fullWidth
                          component={TextField}
                          required
                          multiline
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
                        {role != "aluno" ? (
                          <Grid item xs={12}>
                            <Field
                              name="nota"
                              fullWidth
                              component={TextField}
                              label="Nota"
                            />
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <Field
                              name="nota_nao_alteravel"
                              disabled
                              fullWidth
                              component={TextField}
                              label="Nota Final"
                            />
                          </Grid>
                        )}
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
                          <p></p>
                        )}
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
