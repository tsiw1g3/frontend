import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

/*
  Componente responsável pela renderização da tabela de defesas
*/

const columns = [
  { field: "tipo", headerName: "Defesa", width: 130 },
  { field: "titulo_trabalho", headerName: "Título do Trabalho", width: 390 },
  { field: "autor", headerName: "Autor", width: 260 },
  { field: "data_realizacao", headerName: "Data de realização", width: 260 },
  { field: "local", headerName: "Local ou link", width: 200 },
];

export default function DataTable(params) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={params.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
