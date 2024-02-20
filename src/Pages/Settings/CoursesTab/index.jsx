import React, { useReducer } from "react";

import { makeStyles } from "@material-ui/styles";
import { DataGrid } from "@mui/x-data-grid";
import ReactLoading from "react-loading";

import { Box, Modal, TextField } from "@material-ui/core";
import useCourses from "Hooks/Users/useCourses";
import CourseForm from "./CourseForm";

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

const COURSES_MODAL_ACTIONS = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  UPDATE_SELECTED_COURSE: "UPDATE_SELECTED_COURSE",
};

const INITIAL_STATE = {
  open: false,
  selectedCourse: undefined,
};

function useCoursesModalReducer(state = INITIAL_STATE, action = null) {
  switch (action.type) {
    case COURSES_MODAL_ACTIONS.OPEN_MODAL:
      return { ...state, open: true };
    case COURSES_MODAL_ACTIONS.CLOSE_MODAL:
      return { ...state, open: false };
    case COURSES_MODAL_ACTIONS.UPDATE_SELECTED_COURSE:
      return { ...state, selectedCourse: action.payload };
    default:
      return state;
  }
}

function useCoursesModal() {
  const [state, dispatch] = useReducer(useCoursesModalReducer, INITIAL_STATE);

  const openModal = () => dispatch({ type: COURSES_MODAL_ACTIONS.OPEN_MODAL });
  const closeModal = () =>
    dispatch({ type: COURSES_MODAL_ACTIONS.CLOSE_MODAL });

  const updateSelectedCourse = (course) =>
    dispatch({
      type: COURSES_MODAL_ACTIONS.UPDATE_SELECTED_COURSE,
      payload: course,
    });

  return { ...state, updateSelectedCourse, openModal, closeModal };
}

export default function CoursesTab() {
  const classes = useStyles();
  const { courses, loading, handleSearch, handleEdit } = useCourses();
  const { open, updateSelectedCourse, selectedCourse, openModal, closeModal } =
    useCoursesModal();

  const columns = [
    {
      field: "sigla",
      headerName: "Sigla",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nome",
      headerName: "Nome",
      minWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "disciplina",
      headerName: "Disciplina de Conclusão",
      minWidth: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "coordenacao",
      headerName: "Coordenador",
      minWidth: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cargo_coordenacao",
      headerName: "Título do Coordenador",
      minWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "Ações",
      renderCell: CoursesAction,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: 4,
    padding: "4px",
  };

  function CoursesAction({ row }) {
    return (
      <button
        title="Editar banca"
        name="edit-board"
        type="submit"
        id="edit-board"
        onClick={() => {
          updateSelectedCourse(row);
          openModal();
        }}
      />
    );
  }

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
          <Modal open={open} onClose={closeModal}>
            <Box sx={style}>
              <CourseForm
                course={selectedCourse}
                onSubmit={(values) => {
                  handleEdit(values);
                  closeModal();
                }}
              />
            </Box>
          </Modal>
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
            autoHeight
            disableColumnMenu
            disableColumnFilter
            disableSelectionOnClick
          />
        </>
      )}
    </>
  );
}
