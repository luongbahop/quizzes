import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Category, Quiz, Filters } from '../interfaces';
import { fetchQuizCategories, fetchQuizzes } from '../services';

import Quizzes from '../components/Quizzes';
import QuizForm from '../components/QuizForm';
import Loading from '../components/Loading';

function QuizPage() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    category: 0,
    difficulty: '',
  });

  const handleSubmit = async (filters: Filters) => {
    setLoading(true);
    setCurrentFilters({
      ...currentFilters,
      ...filters,
    });
    const data = await fetchQuizzes(filters);
    setQuizzes(data);
    setLoading(false);
  };
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const cates = await fetchQuizCategories();
      setCategories(cates || []);
      setLoading(false);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (location?.state?.isNewQuiz) {
      setQuizzes([]);
      setCurrentFilters({
        category: 0,
        difficulty: '',
      });
    }
  }, [location]);

  return (
    <div className="quiz">
      <QuizForm
        categories={categories}
        filters={currentFilters}
        onSubmit={handleSubmit}
      />
      <div className="App">
        {loading ? <Loading /> : <Quizzes quizzes={quizzes} />}
      </div>
    </div>
  );
}

export default QuizPage;
