import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Container,
} from "@mui/material";

import { SectionPage } from "../SectionPage";
import { Question, Header } from "./";
import { SectionData, Answer } from "sections";

const sortAnswers = (a: Answer, b: Answer) => {
  if (a.score === null) return -1;
  if (b.score === null) return 1;
  return a.score < b.score ? -1 : 1;
};

interface ElementName {
  question_id: number;
  answer_id: number;
}

interface QuestionnaireFormProps {
  sectionData: SectionData;
  children?: React.ReactNode;
}
const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  sectionData,
  children,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // create answers array for all the answers ids that were checked
    const answers: ElementName[] = Object.values(event?.target)
      .filter((el) => el.value === "true")
      .map((el) => JSON.parse(el.name));
    console.log(answers);

    // TODO: send data
  };
  //   get all questions
  const questions = sectionData?.questions;
  //   //   get first question answers
  const firstQuestion = questions[Object.keys(questions)[0]];
  //   //   sort answers by score
  //   //   TODO: sort on the backend or sort each question
  //   const sortedAnswers = firstQuestion?.answers.sort(sortAnswers);

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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <Header answers={firstQuestion?.answers}/>
          {Object.keys(questions).map((questionID) => {
            const question = questions[questionID];
            return (
              <Question
                key={questionID}
                content={question.content}
                answers={question.answers}
              ></Question>
            );
          })}
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
