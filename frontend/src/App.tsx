import "./App.css";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "./style/theme";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";
import { Questionnaire } from "./components/Questionnaire";
import { AppBar } from "./components/AppBar";
import { useLocalStorage } from "./hooks";
import { Alerts } from "./components/Alerts";
import { AppContextProvider } from "./context/AppContext";

const home_paths = ["home", "/"];

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [localTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    prefersDarkMode ? "dark" : "light"
  );
  const currentTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: localTheme,
        },
      }),
    [localTheme]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContextProvider>
        <CssBaseline />
        <div className="App">
          <AppBar></AppBar>
          <Alerts />
          <Routes>
            {home_paths.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <QuestionnaireProvider>
                    <Questionnaire />
                  </QuestionnaireProvider>
                }
              ></Route>
            ))}
          </Routes>
        </div>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
