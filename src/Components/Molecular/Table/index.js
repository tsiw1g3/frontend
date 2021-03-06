import * as React from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { makeStyles } from '@material-ui/core/styles';

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

const styles = makeStyles({
  root:{
    borderRadius:"10px",
    "& .MuiDataGrid-columnsContainer":{
        background:"#6c7ae0",
        borderRadius:"10px 10px 0 0px"
    },
    "& .MuiDataGrid-columnHeaderTitle":{
        color:"white"
    },
  }
})

export default function DataTable(params) {
  const classes = styles();
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
        className={classes.root}
      />
      </ThemeProvider>
    </div>
  );
}
