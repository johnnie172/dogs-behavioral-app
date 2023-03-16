import { useState, useEffect } from "react";
import "./App.css";
import { getSections } from "./services/questionService";
import { SectionPage } from "./components/SectionPage";
import { useFetch } from "./hooks";
import { FetchComponent } from "./components/FetchComponent";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";

function App() {
  const { data: sectionsData, loading, error } = useFetch(getSections);

  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  useEffect(() => {
    // TODO: change the id with context
    sectionsData?.sections && setSectionId(sectionsData.sections[0]);
  }, [sectionsData]);

  return (
    <QuestionnaireProvider>
    <div className="App">
      {
        <FetchComponent loading={loading} error={error}>
          {sectionId && <SectionPage sectionId={sectionId}></SectionPage>}
        </FetchComponent>
      }
    </div>
    </QuestionnaireProvider>
  );
}

export default App;
