import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
    },
    secondary: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
    },
    input: {
      color: "white",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#DCE3E9",
      image: "url(/img/bg.png)",
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
