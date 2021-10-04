import React from "react";
// import logo from "./../../logo.svg";
import "./styles.css";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const ptBrLocale = {
  code: "pt-br",
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 6, // The week that contains Jan 1st is the first week of the year.
  },
  buttonText: {
    prev: "Ant",
    next: "Sig",
    today: "Hoje",
    month: "Mes",
    week: "Semana",
    day: "Día",
    list: "Agenda",
  },
  weekText: "Sm",
  allDayText: "Todo el día",
  moreLinkText: "más",
  noEventsText: "No hay eventos para mostrar",
};

function Home() {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
        <FullCalendar
          locales={[ptBrLocale]}
          locale="pt-br"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "Apresentação Fred", date: "2021-09-13" },
            { title: "Próxima aula", date: "2021-09-20" },
          ]}
        />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Material-UI
        </Typography> */}
        <Button variant="contained" color="primary">
          Botão 1
        </Button>
        <Button variant="contained" color="secondary">
          Botão 2
        </Button>
      </Paper>
    </Container>
  );
}
export default Home;
