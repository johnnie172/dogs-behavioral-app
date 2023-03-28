import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        action: { marginRight: "auto", marginLeft: 0 },
      },
    },
  },
  direction: "rtl",
});

export default theme;
