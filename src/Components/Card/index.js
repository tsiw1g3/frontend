import * as React from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from "@mui/x-data-grid";
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css";

/*
  Componente responsável pela renderização da tabela de defesas
*/
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR,
);


export default function CardBanca(params) {
  return (
    <div className="card">
        <h4 className="card-title">{params.title}</h4>
        {Array.isArray(params.text) ? (
            params.text.map((textSpan) => (
                <span className="card-text">{textSpan.nome}</span>
            ) ) ) : (
                <span className="card-text">{params.text}</span>
            )
        }
        
    </div>
  );
}
