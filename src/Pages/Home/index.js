import React from "react";
// import logo from "./../../logo.svg";
import "./styles.css";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
import { Button, Paper } from "@material-ui/core";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
  },
}));

const tileData = [
  {
    img: "https://bcc-ufba.github.io/assets/images/sala1.jpg",
    title: "Apresentação parcial",
    date: "2021-10-04",
  },
  {
    img: "https://bcc-ufba.github.io/assets/images/sala2.jpg",
    title: "Finalizar a alpha",
    date: "2021-10-04",
  },
  {
    img: "https://bcc-ufba.github.io/assets/images/sala1.jpg",
    title: "Finalizar a beta",
    date: "2021-10-11",
  },
  {
    img: "https://bcc-ufba.github.io/assets/images/sala2.jpg",
    title: "Finalizar a disciplina?",
    date: "2021-10-18",
  },
];

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
  const classes = useStyles();

  return (
    <Container maxWidth="md" className="App">
      <Paper>
        <GridList className={classes.gridList} cols={2.5}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img}>
              <img
                src={tile.img}
                alt={tile.title}
                style={{ objectFit: "none", width: 400, marginRight: 100 }}
              />
              <GridListTileBar title={tile.title} />
            </GridListTile>
          ))}
        </GridList>

        <FullCalendar
          locales={[ptBrLocale]}
          locale="pt-br"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={tileData}
          // style={{ marginTop: 200 }}
        />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App + Material-UI
        </Typography> */}
        {/* <Button variant="contained" color="primary">
          Botão 1
        </Button>
        <Button variant="contained" color="secondary">
          Botão 2
        </Button> */}
      </Paper>
    </Container>
  );
}
export default Home;
