import { useState, useEffect } from "react";
import "./App.css";
import { getSections } from "./services/questionService";
import { SectionPage } from "./components/SectionPage";
import { useGetData } from "./hooks";
import FetchComponent from "./components/FetchComponent/FetchComponent";

function App() {
  const { data: sectionsData, loading, error } = useGetData(getSections);

  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  useEffect(() => {
    // TODO: change the id with context
    sectionsData?.sections && setSectionId(sectionsData.sections[0]);
  }, [sectionsData]);

  return (
    <div className="App">
      {
        <FetchComponent loading={loading} error={error}>
          {sectionId && <SectionPage sectionId={sectionId}></SectionPage>}
        </FetchComponent>
      }
    </div>
  );
}

export default App;
