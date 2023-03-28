import React, { useRef, useCallback } from "react";
import { Box, Container } from "@mui/material";
import { QuestionnaireFormBtns } from "./";
import { Question, Header } from "./";
import { SectionData, Answer } from "sections";
import { useFetch } from "../../hooks";
import { postDogAnswers } from "../../services/questionService";
import { useEffect } from "react";
import { useQuestionnaireContext } from "../../context/QuestionnaireContext";
import { useAppContext } from "../../context/AppContext";

const sortAnswers = (a: Answer, b: Answer) => {
  if (a.score === null) return -1;
  if (b.score === null) return 1;
  return a.score < b.score ? -1 : 1;
};

const createAnswersBody = (
  questionsIds: string[],
  refObj: { [key: string]: number }
) => {
  const body = {
    answers: questionsIds.map((key) => {
      return { question_id: +key, answer_id: refObj[key] };
    }),
  };
  return body;
};

const usePostAnswers = () => {
  const { alertsDispatch } = useAppContext();

  const { answers, setAnswers } = useQuestionnaireContext();
  const fetchFunc = useCallback(() => postDogAnswers(answers, 1, 1), [answers]);
  const { data, loading, error, setShouldFetch } = useFetch(fetchFunc, false);
  useEffect(() => {
    // clear answers if answers inserted
    if (data?.message === "answers inserted") {
      // TODO: work on this to set multiple sections
      setShouldFetch(false);
      setAnswers({ answers: [] });
      alertsDispatch({
        type: "ADD",
        payload: { severity: "success", message: "התשובות הוזנו בהצלחה" },
      });
    }

    // post new answers if there are any
    if (answers.answers.length === 0) return;
    setShouldFetch(true);
  }, [answers, data]);
  return { data, loading, error };
};

interface QuestionnaireFormProps {
  sectionData: SectionData;
  children?: React.ReactNode;
}
const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  sectionData,
}) => {
  const answersRef = useRef<{ [key: string]: number }>({});

  const { setAnswers } = useQuestionnaireContext();
  usePostAnswers();

  //   get all questions and the amounts of questions
  const questions = sectionData?.questions;
  const questionsLen = Object.keys(questions).length;

  //   get first question answers
  const firstQuestion = questions[Object.keys(questions)[0]];

  //   handle submit function
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // check if all the questions are answered
    const questionsIds = Object.keys(answersRef?.current);
    if (questionsLen !== questionsIds.length) return;

    // create body for the request
    const body = createAnswersBody(questionsIds, answersRef?.current);
    setAnswers(body);

    // clear answerRef
    answersRef.current = {};

    // TODO: add user and dog
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
          <QuestionnaireFormBtns />
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionnaireForm;
