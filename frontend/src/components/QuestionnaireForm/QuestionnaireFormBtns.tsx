import { Stack, Button } from "@mui/material";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const QuestionnaireFormBtns = () => {
  const { sections, currentSection, setCurrentSection } =
    useQuestionnaireContext();
  const sectionsLength = sections.length;
  const isLastSection = currentSection === sectionsLength;

  const handleNext = () => {
    setCurrentSection(currentSection ? currentSection + 1 : 0);
  };

  const handlePrev = () => {
    if (currentSection && currentSection > 1)
      setCurrentSection(currentSection - 1);
  };

  // TODO: handle finish
  const handleFinish = () => {
    console.log("TODO");
  };

  return (
    <Stack width="100%" direction="row">
      {currentSection && currentSection > 1 && (
        <Button
          variant="contained"
          onClick={handlePrev}
          sx={{ mt: 3, mb: 2, mr: "auto" }}
        >
          חזור
        </Button>
      )}
      {isLastSection ? (
        <Button
          type="submit"
          variant="contained"
          onClick={handleFinish}
          sx={{ mt: 3, mb: 2, mr: "auto" }}
        >
          סיום
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 3, mb: 2, mr: "auto" }}
        >
          המשך
        </Button>
      )}
    </Stack>
  );
};

export default QuestionnaireFormBtns;
