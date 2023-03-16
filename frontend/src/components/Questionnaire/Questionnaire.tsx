import { useEffect } from "react";
import { Box } from "@mui/material";
import { getSections } from "../../services/questionService";
import { SectionPage } from "../../components/SectionPage";
import { useFetch } from "../../hooks";
import { FetchComponent } from "../../components/FetchComponent";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const Questionnaire = () => {
  const { data: sectionsData, loading, error } = useFetch(getSections);
  const { sections, setCurrentSection, setSections, currentSection } =
    useQuestionnaireContext();

  useEffect(() => {
    sectionsData?.sections && setSections(sectionsData?.sections);
    sections && setCurrentSection(sections[0]);
  }, [sectionsData, sections, currentSection]);

  return (
    <Box sx={{ width: "inherit", height: "inherit" }}>
      <FetchComponent loading={loading} error={error}>
        {currentSection && (
          <SectionPage sectionId={currentSection}></SectionPage>
        )}
      </FetchComponent>
    </Box>
  );
};

export default Questionnaire;
