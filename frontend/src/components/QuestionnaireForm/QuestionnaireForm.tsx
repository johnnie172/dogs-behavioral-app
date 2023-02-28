import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { SectionPage } from "../SectionPage";
import { Question, Header } from "./";
import { SectionData, Answer } from "sections";

const sortAnswers = (a: Answer, b: Answer) => {
  if (a.score === null) return -1;
  if (b.score === null) return 1;
  return a.score < b.score ? -1 : 1;
};

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
    console.log("todo");
    // TODO: send data
  };

  //   get all questions
  const questions = sectionData?.questions;
  //   get first question answers
  const firstQuestion = questions[Object.keys(questions)[0]];
  //   sort answers by score
  const sortedAnswers = firstQuestion?.answers.sort(sortAnswers);

  return (
    <Container component="main">
      {sectionData?.section && <SectionPage section={sectionData.section} />}
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
          <Header answers={sortedAnswers}></Header>
          {Object.keys(questions).map((questionID) => {
            const question = questions[questionID];
            return (
              <Question
                key={questionID}
                content={question.content}
                answers={sortedAnswers}
              ></Question>
            );
          })}
          <Stack width="100%">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: "auto" }}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionnaireForm;
