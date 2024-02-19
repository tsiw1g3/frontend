import React from "react";

import { makeStyles } from "@material-ui/styles";
import { DataGrid } from "@mui/x-data-grid";
import ReactLoading from "react-loading";

import { TextField } from "@material-ui/core";
import useCourses from "Hooks/Users/useCourses";

const useStyles = makeStyles({
  root: {
    borderRadius: "10px",
    "& .MuiDataGrid-columnsContainer": {
      background: "#6c7ae0",
      borderRadius: "10px 10px 0 0px",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      color: "white",
    },
  },
});

export default function CoursesTab() {
  const classes = useStyles();
  const { courses, loading, handleSearch, handleEdit } = useCourses();

  const columns = [
    { field: "sigla", headerName: "Sigla", minWidth: 150, editable: true },
    {
      field: "nome",
      headerName: "Nome",
      minWidth: 300,
      flex: 1,
      editable: true,
    },
    {
      field: "disciplina",
      headerName: "Disciplina de Conclusão",
      editable: true,
      minWidth: 250,
    },
    {
      field: "coordenacao",
      headerName: "Coordenador",
      editable: true,
      minWidth: 300,
    },
    {
      field: "cargo_coordenacao",
      headerName: "Título do Coordenador",
      editable: true,
      minWidth: 300,
      flex: 1,
    },
  ];

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type={"spin"}
            color={"#41616c"}
            height={50}
            width={50}
          />
        </div>
      ) : (
        <>
          <TextField
            id="banca-search"
            label="Buscar Usuários"
            variant="outlined"
            style={{ backgroundColor: "white", marginBottom: "1rem" }}
            onChange={(e) => handleSearch(e.target.value || "")}
          />
          <DataGrid
            rows={courses}
            columns={columns}
            pageSize={10}
            className={classes.root}
            autoHeight={true}
            disableColumnMenu={true}
            disableColumnFilter={true}
            editMode="row"
            onRowEditStop={({ row: course }) => handleEdit(course)}
          />
        </>
      )}
    </>
  );
}
