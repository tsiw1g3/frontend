import React, { useEffect, useState } from "react";
import "./styles.css";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import DataTable from "../../Components/Molecular/Table";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import api from "Config/http";

/*
  Componente responsável pela homepage
*/

const Home = () => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  const history = useHistory();

  function goToViewBanca(banca) {
    let path = `verbanca?id=` + banca;
    history.push(path);
  }

  const editBanca = (banca) => {
    localStorage.setItem("banca", JSON.stringify(banca));
    let path = `editarbanca`;
    history.push(path);
  };

  const role = localStorage.getItem("role");

  const reload = () => {
    window.location.reload();
  };

  const removeBanca = (bancaId) => {
    api
      .delete(`/banca/${bancaId}/delete`)
      .then(function (response) {
        alert("Banca removida com sucesso");
        reload();
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const renderDetailsButton = (params) => {
    return (
      <div>
        <button
          title="Ver banca"
          name="see-board"
          type="submit"
          id="see-board"
          onClick={() => goToViewBanca(params.row.id)}
        ></button>
        {role === 3 ? (
          <>
            <button
              title="Editar banca"
              name="edit-board"
              type="submit"
              id="edit-board"
              onClick={() => editBanca(params.row)}
            ></button>
            <button
              title="Remover banca"
              name="trash"
              type="submit"
              id="trash"
              onClick={() => removeBanca(params.row.id)}
            ></button>
          </>
        ) : null}
      </div>
    );
  };

  const columns = [
    { field: "formatedData", headerName: "Data", width: 140 },
    { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 500 },
    { field: "autor", headerName: "Discente", width: 200 },
    { field: "orientador", headerName: "Orientador", width: 200 },
    { field: "curso", headerName: "Curso", width: 200 },
    { field: "local", headerName: "Local ou link", width: 300 },
    {
      field: "actions",
      headerName: "Ações",
      width: 370,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ];

  // const logout = () => {
  //   let path = ``;
  //   history.push(path);
  //   localStorage.removeItem("loginToken");
  // };

  const searchBoard = () => {
    let inputValue = document.getElementById("banca-search").value;
    let data1 = rawData[0].filter((a) =>
      String(a.titulo_trabalho).toLowerCase().includes(inputValue.toLowerCase())
    );
    let data2 = rawData[1].filter((a) =>
      String(a.titulo_trabalho).toLowerCase().includes(inputValue.toLowerCase())
    );
    var allEvents = [];
    allEvents.push(data1);
    allEvents.push(data2);
    setData(allEvents);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    searchBoard();
  };

  useEffect(() => {
    api.get("/banca").then(function (response) {
      var events = response.data.data;
      if (events) {
        events.forEach((e) => {
          e.data = new Date(e.data_realizacao);
          e.data.setSeconds(0);
          e.formatedData = e.data.toLocaleString("pt-BR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          // console.log(e.formatedData);
          // e.autor = "Frederico Durão";
        });
        const dt = new Date();
        events.sort((a, b) => (a.data_realizacao < b.data_realizacao ? -1 : 1));
        var olderEvents = events.filter((a) => a.data < dt);
        events = events.filter((a) => a.data > dt);
        var allEvents = [];
        allEvents.push(events);
        allEvents.push(olderEvents);
        setRawData(allEvents);
      }
      setDone(true);
      return response;
    });
  }, []);

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
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <form
            className="search-form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div>
              <TextField
                id="banca-search"
                label="Buscar defesas"
                variant="outlined"
              />
              <button
                title="Pesquisar bancas"
                name="search-board"
                type="button"
                id="search-board"
                onClick={() => searchBoard()}
              ></button>
            </div>
          </form>
          <AppBar
            position="static"
            style={{ background: "#fff", color: "#000" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Próximas defesas" {...a11yProps(0)} />
              <Tab label="Defesas anteriores" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <DataTable
              onCellDoubleClick={goToViewBanca}
              columns={columns}
              rows={data.length > 0 ? data[0] : rawData[0]}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataTable
              rows={data.length > 0 ? data[1] : rawData[1]}
              columns={columns}
            />
          </TabPanel>
          {/* <h3 className="left-btn" style={{ color: "#000" }}>
            Próximas defesas
          </h3> */}
        </div>
      )}
    </>
  );
};

export default Home;
