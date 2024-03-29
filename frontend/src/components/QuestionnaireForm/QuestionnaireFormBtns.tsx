import { Stack, Button, ButtonProps } from "@mui/material";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";

const LeftBtn: React.FC<ButtonProps> = ({  ...props }) => (
  <Button
    variant="contained"
    sx={{ mt: 3, mb: 2, mr: "auto" }}
    type="submit"
    {...props}
  >
    {props?.children}{" "}
  </Button>
);
const RightBtn: React.FC<ButtonProps> = ({ ...props }) => (
  <Button
    variant="contained"
    sx={{ mt: 3, mb: 2, ml: "auto" }}
    color="warning"
    {...props}
  >
    {props?.children}{" "}
  </Button>
);

const QuestionnaireFormBtns = () => {
  const { sections, currentSection, setCurrentSection } =
    useQuestionnaireContext();
  const sectionsLength = sections.length;
  const isLastSection = currentSection === sectionsLength;

  const handlePrev = () => {
    if (currentSection && currentSection > 1)
      setCurrentSection(currentSection - 1);
  };

  const handleCancel = () => {
    setCurrentSection(undefined);
  };

  const handleNext = () => {
    setCurrentSection(currentSection ? currentSection + 1 : 0);
  };

  // TODO: handle finish
  const handleFinish = () => {
    console.log("TODO");
  };

  return (
    <Stack width="100%" direction="row">
      {currentSection && currentSection > 1 ? (
        <RightBtn onClick={handlePrev}>חזור</RightBtn>
      ) : (
        <RightBtn onClick={handleCancel}>בטל</RightBtn>
      )}
      {isLastSection ? (
        <LeftBtn onClick={handleFinish}>סיום</LeftBtn>
      ) : (
        <LeftBtn onClick={handleNext}>המשך</LeftBtn>
      )}
    </Stack>
  );
};

export default QuestionnaireFormBtns;
