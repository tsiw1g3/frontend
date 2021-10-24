import React, { useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Button } from "@material-ui/core";

const Home = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  // const { isLoggedIn } = useContext(MyContext);

  // const history = useHistory();

  // const logout = () => {
  //   let path = ``;
  //   history.push(path);
  //   localStorage.removeItem("loginToken");
  // };

  // const addBanca = () => {
  //   let path = `addbanca`;
  //   history.push(path);
  // };

  // const editBanca = (banca) => {
  //   localStorage.setItem("banca", JSON.stringify(banca));
  //   let path = `verbanca`;
  //   history.push(path);
  // };

  // const addUser = (id) => {
  //   localStorage.setItem("bancaId", id);
  //   let path = `addition`;
  //   history.push(path);
  // };

  useEffect(() => {
    setTimeout(() => {
      var bodyFormData = new FormData();
      axios({
        method: "get",
        url: "https://organizacao-de-defesas.herokuapp.com/banca",
        data: bodyFormData,
        headers: { Accept: "application/json" },
      }).then(function (response) {
        var events = response.data.data;
        if (events) {
          events.forEach((e) => {
            e.data = new Date(e.data_realizacao);
          });
          const dt = new Date();
          events.sort((a, b) =>
            a.data_realizacao < b.data_realizacao ? -1 : 1
          );
          events = events.filter((a) => a.data > dt);
          events.slice(0, 5);
          setData(events);
        }
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
          <h3 className="left-btn">Proximos eventos</h3>
          <div className="user-list">
            {data && data.length > 0 ? (
              data.map((banca) => (
                <div key={banca.id} className="user">
                  <span className="user-id">{banca.id}</span>
                  <span className="user-name">{banca.titulo_trabalho}</span>
                  <div className="user-right">
                    <span className="user-role">{banca.local}</span>
                    <span className="user-role">
                      {banca.data.toLocaleString("pt-BR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
