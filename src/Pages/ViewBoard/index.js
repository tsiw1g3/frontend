import React, { useEffect, useContext, useState } from "react";
import "./styles.css";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline, MenuItem, ThemeProvider } from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { getWrapperFromVariant } from "@material-ui/pickers/wrappers/Wrapper";

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
    axios({
      method: "get",
      url: `https://sistema-de-defesa.herokuapp.com/documento/documentoInfo/58`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: loginToken,
        // 'Access-Control-Allow-Origin' : '*',
        // Accept: "application/json",
      },
    }).then(function (response) {
      var data = response.data;

      var bodyFormData = new FormData();
      bodyFormData.append("curso", data.curso);
      bodyFormData.append("disciplina", data.disciplina);
      bodyFormData.append("turma", data.turma);
      bodyFormData.append("titulo_trabalho", data.titulo_trabalho);
      bodyFormData.append("data", data.data);
      bodyFormData.append("horario", data.horario);
      bodyFormData.append("nota_orientador", data.nota_orientador);
      bodyFormData.append("orientador", data.orientador);
      bodyFormData.append("semestre", data.semestre);
      bodyFormData.append("avaliadores", JSON.stringify(data.avaliadores));
      bodyFormData.append("aluno", data.aluno);
      // console.log(data);
      // console.log(response.data);
      // console.log(Date.now());
    axios(
        {
          url:`https://sistema-de-defesa.herokuapp.com/documento/${banca.id}`,
          method:"POST",
          data: bodyFormData,
          responseType: 'blob',
          headers: {
            Authorization: loginToken,
            // 'Access-Control-Allow-Origin' : '*',
            // 'Content-type':"application/json"
          },
        }
      ) // FETCH BLOB FROM IT
        .then((response) => {
          // console.log(Date.now());
          // RETRIEVE THE response AND CREATE LOCAL URL
          setDone(true);
          var _url = window.URL.createObjectURL(response.data);
          window.open(_url, "_blank").focus(); // window.open + focus
        })
        .catch((err) => {
          console.log(err);
        });
    });
    
  };

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

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

  const styles = makeStyles({
    root:{
      boxShadow: "0 0 4px rgb(0 0 0 / 12%), 0 2px 4px rgb(0 0 0 / 20%)",
      padding: "16px"
    }
  });

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#1D2987',
        dark: '#0e1443',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#6c7ae0',
        dark: '#002884',
        contrastText: '#fff',
      },
    },
  });

  const themeEditar = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#329F5B',
        dark: '#184e2d',
        contrastText: '#fff',
      }
    }
  });

  const classesGrid = styles();

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
        <Container className="App banca-form-container">
          <div style={{ padding: 16, display:"flex", flexDirection: "column", maxWidth: 2000 }}>
            <CssBaseline />
            <h2 className="banca-form-header">Editar banca</h2>
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
                    <Grid container alignItems="flex-start" spacing={2} className={classesGrid.root}>
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
                      <Grid style={{padding:0,marginTop:"auto", fontSize: "13px"}} item xs={2}>
                        Remoto
                        <Field name="tipo_banca" component={Radio} type="radio" value="remoto" onClick={handleChange} checked={!tipo_banca}></Field>
                        Presencial
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
                            <ThemeProvider theme={themeEditar}>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={submitting}
                                style={{borderRadius:10}}
                              >
                                Editar
                              </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setDone(false);
                                generateReport();
                              }}
                              style={{marginLeft:10, borderRadius: 10}}
                            >
                              Gerar relatório
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              type="button"
                              disabled={submitting}
                              onClick={goToDashboard}
                              style={{marginLeft:10, borderRadius: 10}}
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
      )}
    </>
  );
}
export default ViewBoard;
