import React, { useRef } from "react";
import { Box, Button, Stack, Container } from "@mui/material";

import { Question, Header } from "./";
import { SectionData, Answer } from "sections";

const sortAnswers = (a: Answer, b: Answer) => {
  if (a.score === null) return -1;
  if (b.score === null) return 1;
  return a.score < b.score ? -1 : 1;
};

// interface ElementName {
//   question_id: number;
//   answer_id: number;
// }

interface QuestionnaireFormProps {
  sectionData: SectionData;
  children?: React.ReactNode;
}
const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  sectionData,
  children,
}) => {
  const answersRef = useRef<{ [key: string]: number }>({});

  //   get all questions and the amounts of questions
  const questions = sectionData?.questions;
  const questionsLen = Object.keys(questions).length;

  //   //   get first question answers
  const firstQuestion = questions[Object.keys(questions)[0]];

  //   //   sort answers by score
  //   const sortedAnswers = firstQuestion?.answers.sort(sortAnswers);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // create answers array for all the answers ids that were checked
    // const answers: ElementName[] = Object.values(event?.target)
    //   .filter((el) => el.value === "true")
    //   .map((el) => JSON.parse(el.name));
    console.log(questionsLen === Object.keys(answersRef?.current).length);
    console.log(answersRef?.current);

    // TODO: send data
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          {/* answers header */}
          <Header answers={firstQuestion?.answers} />

          {/* questions */}
          {Object.keys(questions).map((questionID) => {
            const question = questions[questionID];
            return (
              <Question
                key={questionID}
                content={question.content}
                answers={question.answers}
                answersRef={answersRef}
              ></Question>
            );
          })}

          {/* form bottom section (submit/next/prev)  */}
          <Stack width="100%">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: "auto" }}
            >
              המשך
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionnaireForm;
