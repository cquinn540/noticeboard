import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, lime } from "@mui/material/colors";
import "./App.css";

import Rails from "./images/rails.jpg";
import Container from "./components/Container";

const darkTheme = createTheme({
  palette: {
    primary: { main: amber[500] },
    secondary: { main: lime[600] },
    divider: "rgba(255, 255, 255, 0.12)",
    text: {
      primary: "#f3d277",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        className="App"
        style={{
          height: "120vh",
          width: "120vw",
          backgroundImage: `url(${Rails})`,
        }}
      >
        <Container />
      </div>
    </ThemeProvider>
  );
}

export default App;
