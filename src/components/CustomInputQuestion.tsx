import React, { useState } from 'react';

import { Question } from '../data/questions';

interface CustomInputQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const CustomInputQuestion: React.FC<CustomInputQuestionProps> = ({ question, onAnswer }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your answer"
      />
      <button onClick={handleSubmit} disabled={!inputValue.trim()} className='next-button'>
        Next
      </button>
    </div>
  );
};

export default CustomInputQuestion;
