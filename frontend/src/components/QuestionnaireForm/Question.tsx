import React from "react";
import { Stack, Typography, Checkbox, Box, Grid } from "@mui/material";
import { Answer } from "sections";
interface QuestionProps {
  content: string;
  answers: Answer[];
}

type Score = number | null;

interface QuestionValue {
  question: Answer["question_id"];
  score: Score;
}

const Question: React.FC<QuestionProps> = ({ content, answers }) => {
  const [checked, setChecked] = React.useState<QuestionValue | undefined>(
    undefined
  );

  return (
    <Stack direction="row">
      <Box width={"50%"}>
        <Typography textAlign="left">{content}</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        width={"50%"}
      >
        {answers.map((answer) => {
          const score = answer.score;
          return (
            <Checkbox
              key={answer.id}
              onClick={() => {
                checked?.score === score
                  ? setChecked(undefined)
                  : setChecked({ score: score, question: answer.question_id });
              }}
              checked={checked?.score === score}
            ></Checkbox>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Question;
