import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button} from "@material-ui/core";
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ListItem from '@material-ui/core/ListItem';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, ptBR } from "@mui/x-data-grid";

/*
  Componente responsável pela página de gerenciamento das minhas defesas
*/

function Dashboard() {
  const { toggleNav, registerUser } = useContext(MyContext);

  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  const history = useHistory();

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
    let path = `verbanca`;
    history.push(path);
  };

  const addUser = (id) => {
    localStorage.setItem("bancaId", id);
    let path = `addition`;
    history.push(path);
  };

  const loginToken = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(ListItem);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      axios({
        method: "get",
        url:
        "https://organizacao-de-defesas.herokuapp.com/usuario/" +
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
        setDone(true);
        return response;
      });
    }, 0);
  }, []);

  const theme = createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ptBR,
  );

  const renderDetailsButton = (params) => {
    return (
      <div>
          <button title="Editar banca" name="edit-board" type="submit" id="edit-board" onClick={() => editBanca(params.row)}></button>
          <button title="Adicionar membro" name="add-user" type="submit" id="add-user" onClick={() => addUser(params.row.id)}></button>
          <button title="Enviar Email" name="send-email" type="submit" id="send-email" onClick={() => (console.log("botao de email clicado"))}></button>
      </div>
    )
}
  
  const columns = [
    { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 1300 },
    { field: "curso", headerName: "Curso", width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 250,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    }
  ];

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
          <div>
            <h2 className="left-btn">Minhas Bancas</h2>
            <div className="right-btn">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addBanca}
              >
                Adicionar banca
              </Button>
            </div>
          </div>
          <div className="user-list">
              {data && data.length > 0 ? (
                <div style={{ height: 400, width: "100%" }}>
                <ThemeProvider theme={theme}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
                </ThemeProvider>
              </div>
                // data.map((banca) => (
                //   <StyledTableRow key={banca.id}>
                //     <StyledTableCell className="user-name">{banca.titulo_trabalho}</StyledTableCell>
                //     <StyledTableCell align="right">
                //       <button title="Editar banca" name="edit-board" type="submit" id="edit-board" onClick={() => editBanca(banca)}></button>
                //       <button title="Adicionar membro" name="add-user" type="submit" id="add-user" onClick={() => addUser(banca.id)}></button>
                //     </StyledTableCell>
                //   </StyledTableRow>
                // ))
                ) : (
                  <h1></h1>
                  )}
          </div>
        </div>
      )
      }
    </>
  );
}

export default Dashboard;
