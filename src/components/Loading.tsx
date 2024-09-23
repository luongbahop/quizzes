import React from 'react';
import { Spinner } from 'reactstrap';

const Loading: React.FC = () => {
  return (
    <div
      className="loading-container"
      style={{ textAlign: 'center', padding: '50px' }}
    >
      <Spinner color="primary" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
