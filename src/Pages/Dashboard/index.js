import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, ptBR } from "@mui/x-data-grid";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form, Field } from "react-final-form";
import { TextField} from "final-form-material-ui";
import { Paper, Grid, CssBaseline} from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { flexibleCompare } from "@fullcalendar/react";

/*
  Componente responsável pela página de gerenciamento das minhas defesas
*/

function Dashboard() {
  const { toggleNav, registerUser } = useContext(MyContext);

  const [data2, setData2] = useState([]);
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);
  const [done2, setDone2] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNota, setOpenNota] = useState(false);
  const [openNotaOwner, setOpenNotaOwner] = useState(false);
  const [inn, setInn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [notas, setNotas] = useState([]);

  const history = useHistory();
  localStorage.removeItem("bancaId");

  const logout = () => {
    let path = ``;
    history.push(path);
    localStorage.removeItem("loginToken");
  };

  const addBanca = () => {
    let path = `addbanca`;
    history.push(path);
  };

  const editBanca = (banca) => {
    localStorage.setItem("banca", JSON.stringify(banca));
    let path = `editarbanca`;
    history.push(path);
  };

  const addUser = (id) => {
    localStorage.setItem("bancaId", id);
    let path = `addition`;
    history.push(path);
  };

  const openModal = (banca) => {
    localStorage.setItem("banca", JSON.stringify(banca));
    setOpen(true);
  };

  const openModalNota = (banca, titulo) => {
    localStorage.setItem("banca", JSON.stringify(banca));
    localStorage.setItem("titulo", titulo);
    getBancaUsuarios(banca);
    setOpenNota(true);
  };

  const openModalNotaOwner = (banca, titulo) => {
    localStorage.setItem("banca", JSON.stringify(banca));
    localStorage.setItem("titulo", titulo);
    getBancaUsuarios(banca);
    setOpenNotaOwner(true);
  };

  const closeModal = () => {
      localStorage.removeItem("banca");
      setOpen(false);
  };

  const closeModalNota = () => {
    localStorage.removeItem("banca");
    localStorage.removeItem("titulo");
    setOpenNota(false);
  };

  const closeModalNotaOwner = () => {
    localStorage.removeItem("banca");
    localStorage.removeItem("titulo");
    setOpenNotaOwner(false);
  };

  const loginToken = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");

  const themeButton = createTheme({
    palette: {
      primary: {
        main: '#329F5B',
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    elevation1: {
      boxShadow:"0px 0px 0px",
    },
  }));

  const styles = makeStyles({
    root:
      {
        borderRadius:"10px",
        "& .MuiDataGrid-columnsContainer":{
            background:"#6c7ae0",
            borderRadius:"10px 10px 0 0px"
        },
        "& .MuiDataGrid-columnHeaderTitle":{
            color:"white"
        },
      }
  })

  const classes = useStyles();

  const getBancaUsuarios = async (bancaId) => {
      setLoading(true);
      var bodyFormData = new FormData();
      const users = await axios({
        method: "get",
        url:
          "https://sistema-de-defesa.herokuapp.com/usuario-banca/usuarios/" +
          bancaId,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setLoading(false);
        setInn(response.data.data);
        setDone2(true);
        return response;
      });
  }

  useEffect(() => {
    setTimeout(async () => {
      var bodyFormData = new FormData();
      await axios({
        method: "get",
        url:
        "https://sistema-de-defesa.herokuapp.com/usuario/" +
          userId +
          "/banca",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setData(response.data.data);
      });
      await axios({
        method: "get",
        url:
        "https://sistema-de-defesa.herokuapp.com/banca/" +
          userId +
          "/bancas",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setData2(response.data.data);
        setDone(true);
      });
    }, 0);
  }, []);

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const validate = (values) => {
    const errors = {};
    if (!values.assunto) {
      errors.assunto = "Obrigatório";
    }
    if (!values.mensagem) {
      errors.mensagem = "Obrigatório";
    }
    if (!values.emails) {
      errors.emails = "Obrigatório";
    }
    return errors;
  };

  const validateNota = (values) => {
    const errors = {};
    if (!values.nota) {
      errors.nota = "Obrigatório";
    }
    return errors;
  };

  const onSubmitEmail = async (values) => {
    setLoading(true);
    values.banca = localStorage.getItem("banca");
    const loginToken = localStorage.getItem("loginToken");
    await axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/usuario-banca/usuarios/email`,
      data: getFormData(values),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      setLoading(false);
      alert(response.data.data);
      closeModal();
    }).catch(function (error) {
      setLoading(false);
      alert("Ocorreu um erro ao tentar enviar o email");
      closeModal();
    });
  };

  const onSubmitNota = async (values) => {
    setLoadingModal(true);
    const banca = localStorage.getItem("banca");
    const loginToken = localStorage.getItem("loginToken");
    const id = values.avaliador
    await axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/usuario-banca/nota/${banca}/${id}`,
      data: getFormData(values),
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      setLoadingModal(false);
      alert("Nota enviada com sucesso");
      if(!values.modalOwner){
        closeModalNota();
      }
    }).catch(function (error) {
      setLoadingModal(false);
      alert("Ocorreu um erro ao tentar dar a nota");
      if(!values.modalOwner){
        closeModalNota();
      }
    });
  };

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ptBR,
  );

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const [value, setValue] = React.useState(0);

  const onSubmitNotaOwner = async (values) => {
    onSubmitNota(values)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderDetailsButton = (params) => {
    return (
      <div>
          <button title="Editar banca" name="edit-board" type="submit" id="edit-board" onClick={() => editBanca(params.row)}></button>
          <button title="Adicionar membro" name="add-user" type="submit" id="add-user" onClick={() => addUser(params.row.id)}></button>
          <button title="Enviar Email" name="send-email" type="submit" id="send-email" onClick={() => openModal(params.row.id)}></button>
          <button title="Dar Nota" name="give-score" type="submit" id="give-score" onClick={() => openModalNotaOwner(params.row.id, params.row.titulo_trabalho)}></button>
      </div>
    )
  }

  const renderDetailsButton2 = (params) => {
    return (
      <div>
          <button title="Dar Nota" name="give-score" type="submit" id="give-score-solo" onClick={() => openModalNota(params.row.id, params.row.titulo_trabalho)}></button>
      </div>
    )
  }
  
  const renderDetailsButton3 = (params) => {
    return (
      <div>
        <Form
          onSubmit={onSubmitNotaOwner}
          initialValues={{"avaliador":params.id, "modalOwner":true}}
          validate={validateNota}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
                <Field
                fullWidth
                Obrigatório
                name="nota"
                component={TextField}
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
                label="Nota"
                />
                <ThemeProvider theme={themeButton}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                      style={{marginLeft:"15px", borderRadius: 10}}
                    >
                        Enviar
                    </Button>
                </ThemeProvider>
            </form>
          )}
        />
    </div>
    )
  }

  const columns = [
    { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 1250 },
    { field: "curso", headerName: "Curso", width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 300,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    }
  ];

  const columns2 = [
    { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 1250 },
    { field: "curso", headerName: "Curso", width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 300,
      renderCell: renderDetailsButton2,
      disableClickEventBubbling: true,
    }
  ];

  const columnsNota = [
    { field: "nome", headerName: "Avaliador", width: 600 },
    { field: "role", headerName: "Função", width: 150 },
    {
      field: 'nota',
      headerName: 'Nota',
      width: 290,
      renderCell: renderDetailsButton3,
      disableClickEventBubbling: true,
    },
  ];

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
        <div className="container">
          <div className="tcc-list">
              <AppBar position="static" style={{ background: '#fff', color: '#000', display: "-webkit-box" }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ width:"100%"}}>
                  <Tab label="Minhas defesas" {...a11yProps(0)} />
                  <Tab label="Defesas em que participo" {...a11yProps(1)} />
                  <ThemeProvider theme={themeButton}>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={addBanca}
                        style={{borderRadius: 10}}
                      >
                        Adicionar banca
                      </Button>
                  </ThemeProvider>
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                  {data2 && data2.length > 0 ? (
                    <div style={{ height: 400, width: "100%" }}>
                    <ThemeProvider theme={theme}>
                    <DataGrid
                      rows={data2}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      className={classesGrid.root}
                    />
                    </ThemeProvider>
                  </div>
                    ) : (null)}
              </TabPanel>
              <TabPanel value={value} index={1}>
                  {data && data.length > 0 ? (
                    <div style={{ height: 400, width: "100%" }}>
                    <ThemeProvider theme={theme}>
                    <DataGrid
                      rows={data}
                      columns={columns2}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      className={classesGrid.root}
                    />
                    </ThemeProvider>
                  </div>
                    ) : (null)}
              </TabPanel>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                        {loading ? (
                        <div className="center">
                          <ReactLoading
                            type={"spin"}
                            color={"#41616c"}
                            height={100}
                            width={100}
                          />
                        </div>
                        ):(null)
                      }
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                          <h2 id="transition-modal-title">Convidar pessoas para defesa</h2>
                          <span style={{cursor:"pointer"}} onClick={closeModal}>x</span>
                      </div>
                      <p id="transition-modal-description">Os emails devem ser separados por vírgula</p>
                      <Form
                        onSubmit={onSubmitEmail}
                        initialValues={{
                          mensagem: "Olá, gostaria de convidá-lo(a) para compor a banca de TCC abaixo."
                        }}
                        validate={validate}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                          <form onSubmit={handleSubmit} noValidate>
                            <Paper className={classes.elevation1} style={{ padding: 16 }}>
                              <Grid container alignItems="flex-start" spacing={2}>
                              <Grid item xs={12}>
                                  <Field
                                    fullWidth
                                    Obrigatório
                                    multiline
                                    name="emails"
                                    component={TextField}
                                    type="text"
                                    label="Destinatários"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Field
                                    fullWidth
                                    Obrigatório
                                    multiline
                                    name="assunto"
                                    component={TextField}
                                    type="text"
                                    label="Assunto"
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <Field
                                    fullWidth
                                    Obrigatório
                                    multiline
                                    name="mensagem"
                                    component={TextField}
                                    type="text"
                                    label="Mensagem"
                                  />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                  <ThemeProvider theme={themeButton}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        style={{borderRadius:10}}
                                      >
                                        Enviar
                                      </Button>
                                  </ThemeProvider>
                                </Grid>
                              </Grid>
                            </Paper>
                          </form>
                        )}
                      />
                  </div>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openNota}
                onClose={closeModalNota}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openNota}>
                  <div className={classes.paper}>
                        {loading ? (
                        <div className="center">
                          <ReactLoading
                            type={"spin"}
                            color={"#41616c"}
                            height={100}
                            width={100}
                          />
                        </div>
                        ):(null)
                      }
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                          <h3 id="transition-modal-title">Avaliar a banca: {localStorage.getItem("titulo")}</h3>
                          <span style={{cursor:"pointer"}} onClick={closeModalNota}>x</span>
                      </div>
                      <Form
                        onSubmit={onSubmitNota}
                        initialValues={{"avaliador":0}}
                        validate={validateNota}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                          <form onSubmit={handleSubmit} noValidate>
                            <Paper className={classes.elevation1} style={{ padding: 16 }}>
                              <Grid container alignItems="flex-start" spacing={2}>
                              <Grid item xs={12}>
                                  <Field
                                    fullWidth
                                    Obrigatório
                                    type="number"
                                    name="nota"
                                    component={TextField}
                                    InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
                                    label="Nota"
                                  />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                  <ThemeProvider theme={themeButton}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        style={{borderRadius:10}}
                                      >
                                        Enviar
                                      </Button>
                                  </ThemeProvider>
                                </Grid>
                              </Grid>
                            </Paper>
                          </form>
                        )}
                      />
                  </div>
                </Fade>
              </Modal>
              {loading ? (
                  <div className="center">
                    <ReactLoading
                      type={"spin"}
                      color={"#41616c"}
                      height={100}
                      width={100}
                    />
                  </div>
                  ):(
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openNotaOwner}
                  onClose={closeModalNotaOwner}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={{ width: "100%" }}
                >
                  <Fade in={openNotaOwner}>
                      <div className={classes.paper}>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h3 id="transition-modal-title">Avaliar a banca: {localStorage.getItem("titulo")}</h3>
                            <span style={{cursor:"pointer"}} onClick={closeModalNotaOwner}>x</span>
                        </div>
                          <Paper className={classes.elevation1} style={{ padding: 16, width:"1050px" }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                              <Grid item xs={12}>
                              {loadingModal ? (
                                <div className="center">
                                  <ReactLoading
                                    type={"spin"}
                                    color={"#41616c"}
                                    height={100}
                                    width={100}
                                  />
                                </div>
                                ):(null)}
                                {inn && inn.length > 0 ? (
                                  <div style={{ height: 400, width: "100%" }}>
                                    <DataGrid
                                      rows={inn}
                                      columns={columnsNota}
                                      pageSize={5}
                                      rowsPerPageOptions={[5]}
                                      rowHeight={62}
                                      className={classesGrid.root}
                                    />
                                </div>
                                ):(null)}
                              </Grid>
                            </Grid>
                          </Paper>
                      </div>
                  </Fade>
              </Modal>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
