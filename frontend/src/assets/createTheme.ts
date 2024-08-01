import { createTheme } from "@mui/material/styles";

let grey = "#DDD";
let primary_main = "#007C7F";
let primary_dark = "#006D71";
let primary_light = "#00A2A6";

export const theme = createTheme({
  palette: {
    common: {
      white: "#fff",
      black: "#333"
    },
    primary: {
      main: primary_main,
      dark: primary_dark,
      light: primary_light,
      contrastText: "#FFF"
    },
    secondary: {
      main: grey
    }
  }
});
