import React, { useState } from 'react';
import { TextField } from '@mui/material';

const TextQuestion = ({ sectionIndex, questionIndex, question, handleAddOption2 }) => {
  const [responseValue, setResponseValue] = useState(question.correctResponse);

  const handleResponseChange = (e) => {
    const newValue = e.target.value;
    setResponseValue(newValue);
  };

  const handleResponseBlur = () => {
    handleAddOption2(sectionIndex, questionIndex, 'correctResponses', { content: responseValue, questionId: question.id });
  };

  return (
    <TextField
      placeholder="Your text response"
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      size="small"
      value={responseValue}
      onChange={handleResponseChange}
      onBlur={handleResponseBlur}
    />
  );
};

export default TextQuestion;
