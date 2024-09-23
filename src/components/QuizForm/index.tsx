import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { DIFFICULTY_LEVELS } from '../../constants';

import { Category, Filters } from '../../interfaces';
import './QuizForm.css';

interface Props {
  filters: Filters;
  categories: Category[];
  onSubmit: (filters: Filters) => void;
}

const QuizForm: React.FC<Props> = ({ filters, categories, onSubmit }) => {
  const [category, setCategory] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>('');

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(Number(e.target.value));
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      difficulty,
    });
  };

  const isSubmittbale = !!category && !!difficulty;

  useEffect(() => {
    setCategory(filters.category);
    setDifficulty(filters.difficulty);
  }, [filters]);

  return (
    <div className="quiz-form">
      <h1>Quiz Maker</h1>
      <Form onSubmit={handleSubmit} className="category-form">
        <FormGroup className="form-group">
          <Input
            type="select"
            name="category"
            id="categorySelect"
            value={category}
            onChange={handleCategoryChange}
            className="mr-sm-2"
          >
            <option value={0} disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Input
            type="select"
            name="difficulty"
            id="difficultySelect"
            value={difficulty}
            onChange={handleDifficultyChange}
            className="mr-sm-2"
          >
            <option value="" disabled>
              Select difficulty
            </option>
            {DIFFICULTY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div className="mb-3">
          <Button id="createBtn" color="primary" disabled={!isSubmittbale}>
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default QuizForm;
