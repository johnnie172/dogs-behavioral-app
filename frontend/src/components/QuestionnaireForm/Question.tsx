import React from "react";
import { Stack, Typography, Box, Grid, Radio, RadioGroup } from "@mui/material";
import { Answer } from "sections";
import { AnswerRadioBtn } from "./";
interface QuestionProps {
  content: string;
  answers: Answer[];
  selectedAnswerId?: number;
  answersRef: React.MutableRefObject<{
    [key: string]: number;
  }>;
}

interface QuestionValue {
  question_id: Answer["question_id"];
  answer_id: Answer["id"];
}

const Question: React.FC<QuestionProps> = ({
  content,
  answers,
  selectedAnswerId,
  answersRef,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<
    QuestionValue | undefined
  >(undefined);

  //   check if question already been answered and set checked
  React.useEffect(() => {
    answers.forEach((answer) => {
      answer?.id === selectedAnswerId &&
        setSelectedAnswer({
          question_id: answer.question_id,
          answer_id: answer.id,
        });
    });
  }, []);

  //   update answersRef with selectedAnswer
  React.useEffect(() => {
    if (selectedAnswer && answersRef?.current)
      answersRef.current[`${selectedAnswer?.question_id}`] =
        selectedAnswer?.answer_id;
  }, [selectedAnswer?.answer_id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(JSON.parse(event?.target?.value));
  };

  const size = `${100 / answers.length}%`;

  return (
    <Stack direction="row">
      {/* question content */}
      <Box width="50%" margin="auto">
        <Typography>{content}</Typography>
      </Box>

      {/* answers buttons */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        width={"50%"}
      >
        <RadioGroup
          row
          sx={{ width: "100%" }}
          value={JSON.stringify(selectedAnswer) ?? ""}
          onChange={handleChange}
        >
          {/* create radio button for each answer */}
          {answers.map((answer) => (
            <AnswerRadioBtn
              key={answer.id}
              answer={answer}
              sx={{ width: size }}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Stack>
  );
};

export default Question;
