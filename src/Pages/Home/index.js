import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import DataTable from "../../Components/Molecular/Table";

/*
  Componente responsável pela homepage
*/

const Home = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  //TODO Remover código legado

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
            e.data.setSeconds(0);
            e.formatedData = e.data.toLocaleString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            console.log(e.formatedData);
            e.autor = "Frederico Durão";
          });
          const dt = new Date();
          events.sort((a, b) =>
            a.data_realizacao < b.data_realizacao ? -1 : 1
          );
          events = events.filter((a) => a.data > dt);
          setData(events);
          console.log(data);
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
          <h3 className="left-btn" style={{ color: "#000" }}>
            Próximas defesas
          </h3>
          {/* TODO Remover código de tabela legado */}
          <div className="user-list">
            {/* {data && data.length > 0 ? (
              data.map((banca) => {
                return (
                  <div key={banca.id} className="user">
                    <span className="user-id">Defesa de TCC</span>
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
                );
              })
            ) : (
              <p></p>
            )} */}
          </div>
          <DataTable rows={data} />
          {console.log(data)}
        </div>
      )}
    </>
  );
};

export default Home;
