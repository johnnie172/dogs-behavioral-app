import { useState, useEffect } from "react";
import { SectionsData } from "sections";
import "./App.css";
import { SECTIONS_ENDPOINT, SECTION_ENDPOINT } from "./consts";
import { useAxiosFetch } from "./hooks";

import { SectionPage } from "./components/SectionPage";

function App() {
  const {
    data: sectionsData,
    loading,
    error,
  } = useAxiosFetch<SectionsData>({
    api: SECTIONS_ENDPOINT,
    withCredentials: false,
  });
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!sectionsData) return;

    // TODO: change the id with context
    setSectionId(sectionsData.sections[0]);
  }, [sectionsData]);

  const sectionApi = sectionId ? `${SECTION_ENDPOINT}${sectionId}` : null;
  return (
    <div className="App">
      {sectionApi && sectionId && (
        <SectionPage sectionApi={sectionApi}></SectionPage>
      )}
    </div>
  );
}

export default App;
