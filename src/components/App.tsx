import React from 'react';

import { useQuiz } from '../hooks/useQuiz';
import { Question } from '../data/questions';

import SelectSexQuestion from './SelectSexQuestion';
import PregnancyQuestion from './PregnancyQuestion';
import CustomInputQuestion from './CustomInputQuestion';
import Summary from './Summary';

import './App.css';

const App: React.FC = () => {
  const {
    currentQuestionId,
    answers,
    questionList,
    handleAnswer,
    resetQuiz
  } = useQuiz();

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'select-sex':
        return <SelectSexQuestion question={question} onAnswer={handleAnswer} />;
      case 'pregnancy-variant':
        return <PregnancyQuestion question={question} onAnswer={handleAnswer} />;
      case 'custom-input':
        return <CustomInputQuestion question={question} onAnswer={handleAnswer} />;
      case 'summary':
        return <Summary answers={answers} onReset={resetQuiz} />;
      default:
        return null;
    }
  };

  const currentQuestion = questionList.find(q => q.id === currentQuestionId);

  if (currentQuestionId === -1 || !currentQuestion) {
    return <Summary answers={answers} onReset={resetQuiz} />;
  }

  return (
    <div className="quiz-container">
      {renderQuestion(currentQuestion)}
    </div>
  );
};

export default App;
