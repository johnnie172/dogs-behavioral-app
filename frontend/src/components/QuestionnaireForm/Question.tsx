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
  const size = `${100 / answers.length}%`;

  return (
    <Stack direction="row">
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
              sx={{ width: size }}
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
      <Box width="50%" margin="auto">
        <Typography textAlign="right">{content}</Typography>
      </Box>
    </Stack>
  );
};

export default Question;
