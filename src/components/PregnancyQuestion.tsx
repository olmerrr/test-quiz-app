import React, { useState } from 'react';

import { Question } from '../data/questions';

interface PregnancyQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const PregnancyQuestion: React.FC<PregnancyQuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
    }
  };

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="options">
        <label>
          <input
            type="radio"
            name="option"
            value="yes"
            onChange={() => setSelectedOption('yes')}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="no"
            onChange={() => setSelectedOption('no')}
          />
          No
        </label>
      </div>
      <button onClick={handleSubmit} disabled={!selectedOption} className='next-button'>
        Next
      </button>
    </div>
  );
};

export default PregnancyQuestion;
