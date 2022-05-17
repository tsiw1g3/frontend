import * as React from "react";
import { useHistory } from "react-router-dom";
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

export default function DataTable(params) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <ThemeProvider theme={theme}>
      <DataGrid
        onCellDoubleClick={(pms, event) => {
            event.defaultMuiPrevented = true;
            params.onCellDoubleClick(pms.id);
        }}
        rows={params.rows}
        columns={params.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </ThemeProvider>
    </div>
  );
}
