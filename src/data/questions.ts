export interface Question {
  id: number;
  type: string;
  question: string;
  additionalOptions?: { [key: string]: any };
  conditionalBlocks?: { [key: string]: Question[] };
}

export interface Answer {
  questionId: number;
  answer: any;
  timeSpent: number;
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'select-sex',
    question: 'What is your gender assigned at birth?',
    conditionalBlocks: {
      female: [
        {
          id: 2,
          question: 'Are you currently pregnant?',
          type: 'pregnancy-variant'
        }
      ]
    }
  },
  {
    id: 3,
    question: 'Do you have any known allergies?',
    type: 'custom-input'
  },
  {
    id: 4,
    question: 'You are all set!',
    type: 'summary'
  }
];
