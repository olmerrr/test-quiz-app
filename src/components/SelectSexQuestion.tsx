import React from 'react';

import { Question } from '../data/questions';

interface SelectSexQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const SelectSexQuestion: React.FC<SelectSexQuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="options">
        <button onClick={() => onAnswer('male')} className="option-button">Male</button>
        <button onClick={() => onAnswer('female')} className="option-button option-button__female">Female</button>
      </div>
    </div>
  );
};

export default SelectSexQuestion;
