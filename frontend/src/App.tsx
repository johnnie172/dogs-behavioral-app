import { useState, useEffect } from "react";
import "./App.css";
import { getSections } from "./services/questionService";
import { SectionPage } from "./components/SectionPage";
import { useGetData } from "./hooks";

function App() {
  const { data: sectionsData, loading } = useGetData(getSections);

  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  useEffect(() => {
    // TODO: change the id with context
    sectionsData?.sections && setSectionId(sectionsData.sections[0]);
  }, [sectionsData]);

  return (
    <div className="App">
      {sectionId && <SectionPage sectionId={sectionId}></SectionPage>}
      {loading && <h1>loading...</h1>}
    </div>
  );
}

export default App;
