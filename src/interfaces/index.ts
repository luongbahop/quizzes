export interface Category {
  id: number;
  name: string;
}

export interface Quiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: string[];
  selected_answer?: string;
}

export interface Filters {
  category: number;
  difficulty: string;
  type?: string;
  amount?: number;
}
