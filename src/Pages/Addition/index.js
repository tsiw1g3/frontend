import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button } from "@material-ui/core";

/*
  Componente responsável pela página de adição de usuários à bancas
*/

function Addition() {
  const { toggleNav, registerUser } = useContext(MyContext);

  const [data, setData] = useState([]);
  const [inn, setInn] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [done, setDone] = useState(undefined);
  const [done2, setDone2] = useState(undefined);

  const history = useHistory();

  const reload = () => {
    window.location.reload();
  };

  const loginToken = localStorage.getItem("loginToken");
  const userId = localStorage.getItem("userId");
  const bancaId = localStorage.getItem("bancaId");

  const removeUser = (id) => {
    axios({
      method: "delete",
      url: `https://organizacao-de-defesas.herokuapp.com/banca/${bancaId}/user/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      reload();
    });
  };

  const addUser = (id, role) => {
    var bodyFormData = new FormData();
    bodyFormData.append("id_usuario", id);
    bodyFormData.append("role", role);
    axios({
      method: "post",
      url: `https://organizacao-de-defesas.herokuapp.com/usuario-banca/${bancaId}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: loginToken,
        Accept: "application/json",
      },
    }).then(function (response) {
      reload();
    });
  };

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      const users = axios({
        method: "get",
        url:
          "https://organizacao-de-defesas.herokuapp.com/usuario-banca/usuarios/" +
          bancaId,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
          Accept: "application/json",
        },
      }).then(function (response) {
        setInn(response.data.data);
        setDone2(true);
        let ids = [];
        for (var i = 0; i < response.data.data.length; ++i) {
          ids.push(parseInt(response.data.data[i].id));
        }
        setUserIds(ids);
        return response;
      });
    }, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      const users = axios({
        method: "get",
        url: "https://organizacao-de-defesas.herokuapp.com/usuario",
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

  return (
    <>
      {!done || !done2 ? (
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
          <div className="user-list">
            {inn && inn.length > 0 ? (
              inn.map((user) => (
                <div key={user.id} className="user">
                  <span className="user-name">{user.nome}</span>
                  <div className="user-right">
                    <span className="role">{user.role}</span>
                    {user.role != "orientador" ? (
                      <button
                        onClick={() => removeUser(user.id)}
                        className="user-role"
                      >
                        Remover da banca
                      </button>
                    ) : (
                      <div className="hide"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
          <div className="user-list">
            {data && data.length > 0 ? (
              data
                .filter(function (e) {
                  return !userIds.includes(e.id);
                })
                .map((user) => (
                  <div key={user.id} className="user">
                    <span className="user-name">{user.nome}</span>
                    <div className="user-right">
                      <button
                        onClick={() => addUser(user.id, "avaliador")}
                        className="user-role"
                      >
                        Adicionar como avaliador
                      </button>
                      <button
                        onClick={() => addUser(user.id, "aluno")}
                        className="user-role"
                      >
                        Adicionar como aluno
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Addition;
