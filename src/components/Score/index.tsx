import React from 'react';
import { Quiz } from '../../interfaces';
import './Score.css';

interface ScoreProps {
  quizzes: Quiz[];
}

const Score: React.FC<ScoreProps> = ({ quizzes }) => {
  const totalQuizzes = quizzes?.length;
  const totalCorrectAnswers = quizzes?.filter(
    (quiz) => quiz?.selected_answer === quiz.correct_answer
  )?.length;

  const generateClassNames = () => {
    let classNames = 'score';
    if (totalCorrectAnswers <= 1) {
      classNames = `${classNames} bad`;
    } else if (totalCorrectAnswers <= 3) {
      classNames = `${classNames} medium`;
    } else {
      classNames = `${classNames} good`;
    }

    return classNames;
  };

  if (quizzes?.length <= 0) {
    return null;
  }
  return (
    <div className={generateClassNames()}>
      You scored {totalCorrectAnswers} out of {totalQuizzes}
    </div>
  );
};

export default Score;
