export interface Question {
  question: string;
  date: string;
}

interface Answer {
  answer: string;
  date: string;
}

export type ChatItem = Question | Answer;
