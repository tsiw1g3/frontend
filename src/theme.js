import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000",
      light: "#000",
      dark: "#000",
    },
    secondary: {
      main: "#000",
      light: "#000",
      dark: "#000",
    },
    input: {
      color: "white",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFF",
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
});
export default theme;
