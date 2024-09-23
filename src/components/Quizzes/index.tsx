import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Quiz } from '../../interfaces';
import QuizItem from '../QuizItem';
import Score from '../Score';
import './Quizzes.css';

interface Props {
  isNewQuiz: boolean;
  quizzes: Quiz[];
}

const Quizzes: React.FC<Props> = ({ isNewQuiz, quizzes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[]>([]);

  const isSubmittable =
    currentQuizzes?.length &&
    currentQuizzes.every((quiz) => !!quiz.selected_answer);

  const isSubmitted =
    !isNewQuiz && location?.pathname === '/result' && !!location?.state?.quizzes;

  const handleAnswerClick = (order: number, answer: string) => {
    if (isSubmitted) {
      return;
    }
    const newQuizzes = currentQuizzes?.map((quiz, index) =>
      order === index ? { ...quiz, selected_answer: answer } : quiz
    );
    setCurrentQuizzes(newQuizzes);
  };

  const handleSubmit = () => {
    navigate('/result', { state: { quizzes: currentQuizzes } });
  };

  const navigateToNewQuiz = () => {
    setCurrentQuizzes([]);
    navigate('/', { state: { isNewQuiz: true } });
  };

  useEffect(() => {
    setCurrentQuizzes(quizzes);
  }, [quizzes]);

  useEffect(() => {
    if (location.pathname === '/result') {
      if (!!location?.state?.quizzes) {
        setCurrentQuizzes(location.state.quizzes);
      } else {
        navigateToNewQuiz();
      }
    }
  }, [location.pathname]);

  if (currentQuizzes?.length <= 0) {
    return null;
  }

  return (
    <div className="quiz-list">
      {isSubmitted && <h4>Results</h4>}
      {currentQuizzes.map((quiz, index) => (
        <QuizItem
          key={index}
          isSubmitted={isSubmitted}
          order={index}
          question={quiz.question}
          selected_answer={quiz?.selected_answer}
          correct_answer={quiz.correct_answer}
          answers={quiz?.answers || []}
          onAnswerClick={handleAnswerClick}
        />
      ))}
      {isSubmitted && (
        <div className="buttons">
          <Score quizzes={currentQuizzes} />
          <Button color="dark" block size="large" onClick={navigateToNewQuiz}>
            Create a New Quiz
          </Button>
        </div>
      )}
      {!isSubmitted && isSubmittable && (
        <div className="buttons">
          <Button color="dark" block size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
