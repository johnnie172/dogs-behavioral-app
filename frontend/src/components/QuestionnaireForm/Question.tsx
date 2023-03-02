import React from "react";
import { Stack, Typography, Checkbox, Box, Grid } from "@mui/material";
import { Answer } from "sections";
interface QuestionProps {
  content: string;
  answers: Answer[];
}

interface QuestionValue {
  question_id: Answer["question_id"];
  answer_id: Answer["id"];
}

const Question: React.FC<QuestionProps> = ({ content, answers }) => {
  const [checked, setChecked] = React.useState<QuestionValue | undefined>(
    undefined
  );
  const size = `${100 / answers.length}%`;

  return (
    <Stack direction="row">
      <Box width="50%" margin="auto">
        <Typography>{content}</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        width={"50%"}
      >
        {answers.map((answer) => {
          const answer_id = answer.id;
          const name = {
            question_id: answer.question_id,
            answer_id: answer_id,
          };
          return (
            <Checkbox
              name={JSON.stringify(name)}
              value={checked?.answer_id === answer_id}
              sx={{ width: size }}
              key={answer_id}
              onClick={() => {
                checked?.answer_id === answer_id
                  ? setChecked(undefined)
                  : setChecked({
                      answer_id: answer_id,
                      question_id: answer.question_id,
                    });
              }}
              checked={checked?.answer_id === answer_id}
            ></Checkbox>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Question;
