import { API_URL, NUMBER_OF_QUESTIONS, QUIZ_TYPE } from '../constants';
import { Category, Filters, Quiz } from '../interfaces';

interface CategoriesResponse {
  trivia_categories: Category[];
}

interface QuizzesResponse {
  response_code: number;
  results: Quiz[];
}

export const convertToUrlParams = (params: Filters) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  return searchParams.toString();
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const formattedQuizzes = (quizzes: Quiz[]) => {
  return quizzes?.map((quiz) => {
    const answers = [quiz.correct_answer, ...quiz.incorrect_answers];
    return {
      ...quiz,
      answers: shuffleArray(answers),
    };
  });
};

export const fetchQuizCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api_category.php`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: CategoriesResponse = await response.json();
    return data?.trivia_categories || [];
  } catch (error) {
    console.error('error', error);
    throw new Error('Internal Server Error');
  }
};

export const fetchQuizzes = async (params: Filters) => {
  try {
    const newParams = {
      amount: NUMBER_OF_QUESTIONS,
      type: QUIZ_TYPE,
      ...params,
    };
    const filterString = convertToUrlParams(newParams);
    const response = await fetch(`${API_URL}/api.php?${filterString}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: QuizzesResponse = await response.json();
    return formattedQuizzes(data.results);
  } catch (error) {
    console.error('error', error);
    throw new Error('Internal Server Error');
  }
};
