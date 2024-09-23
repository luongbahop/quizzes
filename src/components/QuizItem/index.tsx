import React from 'react';
import { Button } from 'reactstrap';
import './QuizItem.css';

interface QuestionProps {
  isSubmitted: boolean;
  order: number;
  question: string;
  answers: string[];
  correct_answer: string;
  selected_answer?: string;
  onAnswerClick: (order: number, answer: string) => void;
}

const QuizItem: React.FC<QuestionProps> = ({
  isSubmitted,
  order,
  question,
  answers,
  correct_answer,
  selected_answer,
  onAnswerClick,
}) => {
  const generateButtonClassNames = (answer: string) => {
    let classNames = 'answer-button';
    if (isSubmitted) {
      classNames = `${classNames} readonly`;
    }
    if (!isSubmitted) {
      if (selected_answer && selected_answer === answer) {
        classNames = `${classNames} selected`;
      }
    } else {
      if (correct_answer === answer) {
        classNames = `${classNames} selected`;
      }
      if (
        selected_answer &&
        correct_answer !== selected_answer &&
        selected_answer === answer
      ) {
        classNames = `${classNames} wrong`;
      }
    }
    return classNames;
  };
  return (
    <div className="quiz-item">
      <div
        className="quiz-title"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="answers-block">
        {answers.map((answer, index) => (
          <Button
            key={index}
            aria-readonly={isSubmitted}
            className={generateButtonClassNames(answer)}
            onClick={() => onAnswerClick(order, answer)}
          >
            <label dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizItem;
