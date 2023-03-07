import { Answer } from "sections";
import { Radio, RadioProps } from "@mui/material";
interface AnswerRadioBtnProps extends RadioProps {
  answer: Answer;
}

const AnswerRadioBtn: React.FC<AnswerRadioBtnProps> = ({ answer, sx }) => {
  const answerId = answer.id;
  const value = {
    question_id: answer.question_id,
    answer_id: answerId,
  };
  return (
    <Radio
      value={JSON.stringify(value)}
      {...(answer.score === null && { color: "warning" })}
      sx={sx}
    />
  );
};

export default AnswerRadioBtn;
