import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import QuizPage from './containers/QuizPage';
import QuizResultPage from './containers/QuizResultPage';
import NotFound from './containers/NotFound';

const App: React.FC = () => {
  return (
    <div className="wraper">
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/result" element={<QuizResultPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
