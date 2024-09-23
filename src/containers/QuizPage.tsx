import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Category, Quiz, Filters } from "../interfaces";
import { fetchQuizCategories, fetchQuizzes } from "../services";

import Quizzes from "../components/Quizzes";
import QuizForm from "../components/QuizForm";
import Loading from "../components/Loading";
import { Alert } from "reactstrap";

function QuizPage() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    category: 0,
    difficulty: "",
  });

  const isSubmitted =
    location?.pathname === "/result" && !!location?.state?.quizzes;

  const handleSubmit = async (filters: Filters) => {
    try {
      setError(false);
      setLoading(true);
      setCurrentFilters({
        ...currentFilters,
        ...filters,
      });
      const data = await fetchQuizzes(filters);
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setQuizzes([]);
      setError(true);
      console.log("Internal Error: ", error);
    }
  };
  useEffect(() => {
    try {
      const getCategories = async () => {
        setLoading(true);
        const cates = await fetchQuizCategories();
        setCategories(cates || []);
        setLoading(false);
      };
      getCategories();
    } catch (error) {
      console.log("Internal Error: ", error);
    }
  }, []);

  useEffect(() => {
    if (location?.state?.isNewQuiz) {
      setQuizzes([]);
      setCurrentFilters({
        category: 0,
        difficulty: "",
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
      {error ? (
        <Alert color="danger">Fetch quizzes failed, please try again!</Alert>
      ) : (
        <div className="App">
          {loading ? (
            <Loading />
          ) : (
            <Quizzes quizzes={quizzes} isNewQuiz={true} />
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
