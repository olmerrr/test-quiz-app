import { useState, useEffect } from 'react';

import { Answer, Question, questions } from '../data/questions';

export const useQuiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionList, setQuestionList] = useState<Question[]>(questions);

  useEffect(() => {
    const savedId = parseInt(localStorage.getItem('currentQuestionId') || '1');
    const savedAnswers = JSON.parse(localStorage.getItem('answers') || '[]');

    setCurrentQuestionId(savedId);
    setAnswers(savedAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestionId', currentQuestionId.toString());
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [currentQuestionId, answers]);

  const handleAnswer = (answer: any) => {
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000;

    const currentQuestion = questionList.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return;

    const updatedAnswers = [
      ...answers.filter(a => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        answer,
        timeSpent
      }
    ];

    setAnswers(updatedAnswers);
    setStartTime(endTime);

    if (currentQuestion.conditionalBlocks && answer in currentQuestion.conditionalBlocks) {
      const nextQuestions = currentQuestion.conditionalBlocks[answer];

      setQuestionList(prevQuestions => {
        const currentIndex = prevQuestions.findIndex(q => q.id === currentQuestion.id);
        const updatedQuestions = [
          ...prevQuestions.slice(0, currentIndex + 1),
          ...nextQuestions,
          ...prevQuestions.slice(currentIndex + 1).filter(q => !nextQuestions.some(nq => nq.id === q.id))
        ];
        return updatedQuestions;
      });

      setCurrentQuestionId(nextQuestions[0].id);
    } else {
      const currentIndex = questionList.findIndex(q => q.id === currentQuestionId);
      const nextIndex = currentIndex + 1;
      if (nextIndex < questionList.length) {
        setCurrentQuestionId(questionList[nextIndex].id);
      } else {
        setCurrentQuestionId(-1);
      }
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestionId(1);
    setStartTime(Date.now());
    setQuestionList(questions);
    localStorage.clear();
  };

  return {
    currentQuestionId,
    answers,
    questionList,
    handleAnswer,
    resetQuiz,
  };
};
