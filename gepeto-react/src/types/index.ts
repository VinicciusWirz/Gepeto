export interface Question {
  question: string;
  questionDate: string;
}

interface Answer {
  answer: string;
  answerDate: string;
}

export type ChatItem = Question | Answer;
