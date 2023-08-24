import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f9f9f9", // Tono de blanco para el fondo
    },
    primary: {
      main: "#2d2d2d", // Negro para el header
    },
    secondary: {
      main: "#E1E1E1", // Subheader no tan oscuro
    },
    success: {
      main: "#2d9440", // Color césped de fútbol para los botones
    },
    error: {
      main: "#c24041", // Rojo para otros detalles
      secondary: "#086fac"
    },
    menu: {
      primary:'#2f744b',
      secondary:'#76bd8f',
    }
  },
});

export default theme;
