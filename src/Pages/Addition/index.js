import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button, Select, MenuItem, InputLabel, FormControl, ThemeProvider } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { createTheme } from '@material-ui/core/styles';
/*
  Componente responsável pela página de adição de usuários à bancas
*/

function Addition() {
  const { toggleNav, registerUser } = useContext(MyContext);

  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [cargo, setCargo] = useState('');
  const [bancaData, setBancaData] = useState([]);
  const [inn, setInn] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [done, setDone] = useState(undefined);
  const [done2, setDone2] = useState(undefined);
  const [done3, setDone3] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [optionsUsers, setOptionsUsers] = useState([]);

  const history = useHistory();

  const reload = () => {
    window.location.reload();
  };

  const loginToken = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");
  const bancaId = localStorage.getItem("bancaId")


  const optionsCargos = [
    {
      name:"Orientador",
      value:"orientador"
    },
    {
      name:"Co-Orientador",
      value:"coorientador"
    },
    {
      name:"Avaliador",
      value:"avaliador"
    }
  ]

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#329F5B',
        dark: '#184e2d',
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

  const themeRemover = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#df2a39',
        dark: '#931621',
        contrastText: '#fff',
      },
    },
  });

  const removeUser = (id) => {
    axios({
      method: "delete",
      url: `https://sistema-de-defesa.herokuapp.com/banca/${bancaId}/user/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      reload();
    }).catch(function (error) {
      alert(error.response.data.message);
    });
  };

  const addUser = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("id_usuario", usuario);
    bodyFormData.append("role", cargo);
    axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/usuario-banca/${bancaId}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      reload();
    }).catch(function (error) {
      alert(error.response.data.message);
    });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     var bodyFormData = new FormData();
  //     const users = axios({
  //       method: "get",
  //       url:
  //         "https://sistema-de-defesa.herokuapp.com/usuario-banca/usuarios/" +
  //         bancaId,
  //       data: bodyFormData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: loginToken,
  //         Accept: "application/json",
  //       },
  //     }).then(function (response) {
  //       setInn(response.data.data);
  //       setDone2(true);
  //       let ids = [];
  //       for (var i = 0; i < response.data.data.length; ++i) {
  //         ids.push(parseInt(response.data.data[i].id));
  //       }
  //       setUserIds(ids);
  //       return response;
  //     });
  //   }, 0);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      const users = axios({
        method: "get",
        url: "https://sistema-de-defesa.herokuapp.com/usuario",
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
  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      const banca = axios({
        method: "get",
        url: "https://sistema-de-defesa.herokuapp.com/banca/" + bancaId,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setBancaData(response.data.data);
        setDone3(true);
        var bodyFormData = new FormData();
        const users = axios({
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
        }).then(function (response2) {
          let aluno = {"role":"Aluno", "nome":response.data.data.autor, 'id':0}
          response2.data.data.push(aluno);
          console.log(response2.data.data);
          setInn(response2.data.data);
          setDone2(true);
          let ids = [];
          for (var i = 0; i < response2.data.data.length; ++i) {
            ids.push(parseInt(response2.data.data[i].id));
          }
          setUserIds(ids);
        });
        return response;
      });
    }, 0);
  }, []);

  const renderDetailsButton = (params) => {
    return (
      <div>
        {params.id != 0 ? (
        <ThemeProvider theme={themeRemover}>
          <Button
            onClick={() => removeUser(params.id)}
            className="user-role"
            type="button"
            variant="contained"
            color="primary"
            style={{borderRadius:10}}
          >
            Remover da banca
          </Button>
        </ThemeProvider>
        ) : (null)}
    </div>
    )
  }

  const columnsNota = [
    { field: "role", headerName: "Função", width: 150 },
    { field: "nome", headerName: "Nome", width: 1350 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 200,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ];

  const goToDashboard = () => {
    let path = `dashboard`;
    history.push(path);
  };

  const userChange = (value) => {
    setUsuario(value);
  }

  const roleChange = (value) => {
    setCargo(value);
  }

  if(data && data.length > 0 && optionsUsers.length <= 0){
    const options = data.filter(function (e) {
      return !userIds.includes(e.id);
    }).map((user) => ({name:user.nome, value:user.id}));
    setOptionsUsers(options);
  }

  let missing = '';
  if(inn.length < 4 && inn.length != 1){
    missing += 'Falta(m): '
    let orientador = 1;
    let avaliador = 2;
    for(let x=0;x<inn.length;x++){
      let user = inn[x];
      if(user.role == "orientador"){
        orientador--;
      }
      else if(user.role == "avaliador"){
        avaliador--;
      }
    }
    if(orientador == 1){
      missing += "1 orientador, ";
    }
    if(avaliador == 1){
      missing += "1 avaliador";
    }
    else if(avaliador == 2){
      missing+= "2 avaliadores";
    }
  }
  

  return (
    <>
      {!done || !done2 || !done3 || loading ? (
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
          <h2>Adicionar membro</h2>
          <div>
            <div className="user">
                <div className="user-name">
                      <SelectSearch
                        id="user-select"
                        filterOptions={fuzzySearch}
                        options={optionsUsers}
                        search
                        value={usuario}
                        onChange={userChange}
                        placeholder="Usuário"
                      />
                </div>
                <div className="user-right" style={{display:"flex"}}>
                    <SelectSearch
                        id="role-select"
                        filterOptions={fuzzySearch}
                        options={optionsCargos}
                        search
                        value={cargo}
                        onChange={roleChange}
                        placeholder="Função"
                      />
                    <ThemeProvider theme={theme}>
                      <Button
                        onClick={addUser}
                        className="user-role"
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{marginLeft:16, borderRadius:10}}
                      >
                        Adicionar
                      </Button>
                    </ThemeProvider>
                </div>
             </div>
          </div>
          <div>
            <div>
            <h2 className="left-btn">Componentes da banca <small className="missing">{missing != '' ? missing : null}</small></h2>
            </div>
            <h4 className="right-head">Limites: 1 orientador, 1 co-orientador, 2 avaliadores</h4>
          </div>
          <div className="members-list">
              <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={inn}
                    columns={columnsNota}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rowHeight={62}
                  />
              </div>
          </div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={goToDashboard}
              style={{marginTop:10, borderRadius:10}}
            >
              Voltar
            </Button>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}

export default Addition;
