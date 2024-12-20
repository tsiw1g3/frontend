import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

import { ptBR } from "@mui/x-data-grid";

// A custom theme for this app
const theme = createTheme(
  {
    palette: {
      type: "light",
      primary: {
        main: "#61dafb",
        light: "#61dafb",
        dark: "#21a1c4",
      },
      secondary: {
        main: "#b5ecfb",
        light: "#61dafb",
        dark: "#21a1c4",
      },
      error: {
        main: red.A400,
      },
      background: {
        default: "#282c34",
      },
    },
    overrides: {
      MuiPaper: {
        root: {
          padding: "20px 10px",
          margin: "10px",
          backgroundColor: "#fff", // 5d737e
        },
      },
      MuiButton: {
        root: {
          margin: "5px",
        },
      },
    },
  },
  ptBR
);
export default theme;
