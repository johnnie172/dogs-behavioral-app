import { DogAnswers } from "answers";
import { createContext, useState, useContext } from "react";


export interface QuestionnaireContext {
  answers: DogAnswers
  // TODO: fix types
  setAnswers: (answers: any) => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContext>({
  answers: {answers: []},
  setAnswers: () => {},
});

interface QuestionnaireProviderProps {
  children?: React.ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {

  const [questionnaireContext, setQuestionnaireContext] = useState({
    answers: [],
  });
  return (
    <QuestionnaireContext.Provider
      value={{ answers: questionnaireContext, setAnswers: setQuestionnaireContext }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaireContext = () => {
  const questionnaireContext = useContext(QuestionnaireContext);
  return { ...questionnaireContext };
};





// import { createContext, useState, useContext } from "react";
// import { DogAnswers } from "answers";

// export interface QuestionnaireContext {
//   answers?: DogAnswers;
//   setAnswers: (answers: DogAnswers) => void;
// }

// export const QuestionnaireContext = createContext<QuestionnaireContext>({
//   answers: undefined,
//   setAnswers: () => {},
// });

// interface QuestionnaireProviderProps {
//   children?: React.ReactNode;
// }

// export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({
//   children,
// }) => {
//   const [questionnaireContext, setQuestionnaireContext] = useState<
//     DogAnswers | undefined
//   >();
//   return (
//     <QuestionnaireContext.Provider
//       value={{
//         answers: questionnaireContext,
//         setAnswers: setQuestionnaireContext,
//       }}
//     >
//       {children}
//     </QuestionnaireContext.Provider>
//   );
// };
// export const useQuestionnaireContext = () => {
//   const questionnaireContext = useContext(QuestionnaireContext);
//   return { ...questionnaireContext };
// };
