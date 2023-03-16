import { DogAnswers } from "answers";
import { createContext, useState, useContext } from "react";

export interface QuestionnaireContext {
  answers: DogAnswers;
  sections: number[];
  currentSection: number | undefined;
  setAnswers: (answers: DogAnswers) => void;
  setSections: (sections: number[]) => void;
  setCurrentSection: (section: number) => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContext>({
  answers: { answers: [] },
  sections: [],
  currentSection: undefined,
  setAnswers: () => {},
  setSections: () => {},
  setCurrentSection: () => {},
});

interface QuestionnaireProviderProps {
  children?: React.ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({
  children,
}) => {
  // TODO: useReducer
  const [answers, setAnswers] = useState<QuestionnaireContext["answers"]>({
    answers: [],
  });
  const [sections, setSections] = useState<QuestionnaireContext["sections"]>(
    []
  );
  const [currentSection, setCurrentSection] =
    useState<QuestionnaireContext["currentSection"]>();
  return (
    <QuestionnaireContext.Provider
      value={{
        answers: answers,
        setAnswers: setAnswers,
        sections: sections,
        setSections: setSections,
        currentSection: currentSection,
        setCurrentSection: setCurrentSection,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaireContext = () => {
  const questionnaireContext = useContext(QuestionnaireContext);
  return { ...questionnaireContext };
};
