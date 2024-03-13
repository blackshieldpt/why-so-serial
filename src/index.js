import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "hsl(170, 50%, 80%)",
      main: "hsl(170, 50%, 60%)",
      dark: "hsl(170, 50%, 40%)",
      darker: "hsl(170, 50%, 20%)",
    },

    error: {
      light: "hsl(0, 70%, 80%)",
      main: "hsl(0, 70%, 60%)",
      dark: "hsl(0, 70%, 40%)",
      darker: "hsl(0, 70%, 20%)",
    },

    success: green,
  },
});

import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "@mui/material/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles styles={{ body: { margin: 0 } }} />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
