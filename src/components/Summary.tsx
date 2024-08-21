import React from 'react';

import { Answer } from '../data/questions';

interface SummaryQuestionProps {
    answers: Answer[];
    onReset: () => void;
}

const SummaryQuestion: React.FC<SummaryQuestionProps> = ({ answers, onReset }) => {
    const totalTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <ul className="list-disc pl-5 mb-4">
                {answers.map((answer) => (
                    <li key={answer.questionId} className="mb-2">
                        <strong>Question {answer.questionId}:</strong> {answer.answer} 
                        <span className="text-gray-600"> (Time spent: {answer.timeSpent.toFixed(2)} seconds)</span>
                    </li>
                ))}
            </ul>
            <p className="text-lg font-semibold mb-4">
                Total time spent: {totalTime.toFixed(2)} seconds
            </p>
            <button 
                onClick={onReset} 
                className="reset-button"
            >
                Reset Quiz
            </button>
        </div>
    );
};

export default SummaryQuestion;
