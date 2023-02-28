
export interface Section {
    id: number;
    title: string;
    description: string;
  }

  export interface Question {
    content: string;
    section_id: number;
    ans_type: "int"|"string";
    subscale: string;
  }

  export interface Answer {
    id: number;
    question_id: number;
    content: string;
    score: null | number;
  }

  export interface QuestionsAnswers extends Question {
    answers: Answer[]
  }

  export interface SectionData {
    section: Section;
    questions: { [key: string]: QuestionsAnswers; }
  }