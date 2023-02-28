import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { SectionPage } from "../SectionPage";
import { Question } from "./";
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
  const questions = sectionData?.questions;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send data
  };
  const firstQuestion = questions[Object.keys(questions)[0]];
  const answersToSort = firstQuestion?.answers;
  answersToSort.sort(sortAnswers);
  //   TODO: add header answers

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
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button> */}
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionnaireForm;
