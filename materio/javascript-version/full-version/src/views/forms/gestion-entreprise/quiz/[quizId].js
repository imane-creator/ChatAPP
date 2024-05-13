// pages/quiz/[quizId].js
import React from 'react';
import { useRouter } from 'next/router';

const Quiz= () => {
  const router = useRouter();
  const { quizId } = router.query;

  return (
    <div>
      <h1>Quiz ID: {quizId}</h1>
      {/* Add your quiz content here */}
    </div>
  );
};

export default Quiz;
