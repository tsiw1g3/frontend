import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button, Select, InputLabel, MenuItem } from "@material-ui/core";
import SelectSearch, { fuzzySearch } from "react-select-search";

/*
  Componente responsável pela página de adição de usuários à bancas
*/

function Users() {
  const { toggleNav, registerUser } = useContext(MyContext);

  const [data, setData] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [done, setDone] = useState(undefined);
  const [inv_url, setInvite] = useState('');
  const [optionsUsers, setOptionsUsers] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [cargo, setCargo] = useState('');

  const history = useHistory();

  const goToDashboard = () => {
    let path = ``;
    history.push(path);
  };

  const reload = () => {
    window.location.reload();
  };

  const loginToken = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");

  const editRole = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("role", cargo);
    setDone(false);
    await axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/usuario/${usuario}/role`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      setDone(true);
      reload();
    });
  };

  const generateLink = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", userId);
    bodyFormData.append("invite_hash", Math.random());
    // setDone(false);
    const invite = axios({
      method: "post",
      url: `https://sistema-de-defesa.herokuapp.com/invite`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
        navigator.clipboard.writeText('http://localhost:3000/#/register?inv=' + response.data.data)
        alert("O link de convite: http://localhost:3000/#/register?inv=" + response.data.data + " foi copiado");
      // reload();
    });
  }
  

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

  const optionsCargos = [
    {
      name:"Orientador",
      value:1
    },
    {
      name:"Co-Orientador",
      value:2
    },
    {
      name:"Admnistrador",
      value:3
    }
  ]

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
          <div className="right-btn">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={generateLink}
            >
              Gerar link de convite
            </Button>
          </div>
          <h2>Usuários</h2>
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
                        placeholder="Cargo"
                      />
                    <Button
                      onClick={editRole}
                      className="user-role"
                      type="button"
                      variant="contained"
                      color="primary"
                    >
                      Alterar cargo
                    </Button>
                </div>
             </div>
             <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={goToDashboard}
              >
                Voltar
              </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
