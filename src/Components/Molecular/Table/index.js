import * as React from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, ptBR } from "@mui/x-data-grid";

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

const columns = [
  { field: "tipo_banca", headerName: "Defesa", width: 130 },
  { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 650 },
  { field: "autor", headerName: "Autor", width: 200 },
  { field: "curso", headerName: "Curso", width: 200 },
  { field: "formatedData", headerName: "Data de realização", width: 200 },
  { field: "local", headerName: "Local ou link", width: 300 },
];

export default function DataTable(params) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <ThemeProvider theme={theme}>
      <DataGrid
        rows={params.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </ThemeProvider>
    </div>
  );
}
