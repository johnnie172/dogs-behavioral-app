import "./App.css";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";
import { Questionnaire } from "./components/Questionnaire";

function App() {
  return (
    <div className="App">
      <QuestionnaireProvider>
        <Questionnaire />
      </QuestionnaireProvider>
    </div>
  );
}

export default App;
