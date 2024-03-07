import React from "react";

import { makeStyles } from "@material-ui/styles";
import { DataGrid } from "@mui/x-data-grid";
import ReactLoading from "react-loading";

import useUsers from "Hooks/Users/useUsers";
import { TextField } from "@material-ui/core";

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

const ROLES_DICT = {
  0: "Discente",
  1: "Orientador",
  2: "Coorientador",
  3: "Administrador",
};

function RenderRolesCell({ row }) {
  const { role } = row;
  return (
    <>
      {ROLES_DICT[role] || "Indefinido"}
      <span style={{ marginLeft: "0.5rem" }} id="edit-board" />
    </>
  );
}

export default function PermissionsTab() {
  const { users, loading, handleEditRole, handleSearch } = useUsers();
  const classes = useStyles();

  const columns = [
    { field: "nome", headerName: "Nome", minWidth: 150, flex: 1 },
    {
      field: "role",
      headerName: "Nível de Acesso",
      minWidth: 250,
      editable: true,
      type: "singleSelect",
      valueOptions: Object.keys(ROLES_DICT).map((key) => ({
        label: ROLES_DICT[key],
        value: key,
      })),
      headerAlign: "center",
      align: "center",
      renderCell: RenderRolesCell,
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
            rows={users}
            columns={columns}
            pageSize={10}
            className={classes.root}
            autoHeight={true}
            disableColumnMenu={true}
            disableColumnFilter={true}
            onCellEditCommit={({ id, value: role }) => handleEditRole(id, role)}
          />
        </>
      )}
    </>
  );
}
