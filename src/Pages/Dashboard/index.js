import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button } from "@material-ui/core";

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
          <div className="left-btn">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={addBanca}
            >
              Adicionar banca
            </Button>
          </div>
          <div className="user-list">
            {data && data.length > 0 ? (
              data.map((banca) => (
                <div key={banca.id} className="user">
                  <span className="user-id">{banca.id}</span>
                  <button
                    onClick={() => editBanca(banca)}
                    className="user-name"
                  >
                    {banca.titulo_trabalho}
                  </button>
                  <div className="user-right">
                    <button
                      onClick={() => addUser(banca.id)}
                      className="user-role"
                    >
                      Adicionar Usuário
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1></h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
