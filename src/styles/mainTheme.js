import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      // light:"#ECF4F9"
      light: teal[400],
      // main: "#27B9C8",
      main: "#F2B90F",
    },
    secondary: {
      main: "#F2B90F",
      contrastText: "#F5F6FA",
    },
    pink: "#F272A1",
    priority: {
      low: "green",
      medium: "orange",
      high: "red",
    },
  },
});
