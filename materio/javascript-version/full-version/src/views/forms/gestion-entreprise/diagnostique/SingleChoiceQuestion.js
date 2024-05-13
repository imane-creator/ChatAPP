import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  noteSelect: {
    marginLeft: '8px' // Ajoutez un espace entre le TextField et le Select
  }
});

const SingleChoiceQuestion = ({
  sectionIndex,
  questionIndex,
  question,
  handleChange,
  handleAddOption1,
}) => {
  const handleAddSuggestion = () => {
    const newSuggestion = { content: '', questionId: question.id };
    handleAddOption1(sectionIndex, questionIndex, 'suggestions', newSuggestion);
  };
  const classes = useStyles();

  return (
    <>

        {question.suggestions.map((suggestion, suggestionIndex) => (

          <div key={suggestionIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TextField
              key={suggestionIndex}
              label='Suggestion'
              value={suggestion?.content || ''}
              onChange={e => {
                const newValue = e.target.value;
                const newQuestion = { ...question };
                if (newQuestion.suggestions && typeof newQuestion.suggestions[suggestionIndex] === 'object') {
                  newQuestion.suggestions[suggestionIndex].content = newValue;
                  handleChange(sectionIndex,  `questions.${questionIndex} `, newQuestion);
                } else {
                  console.error('suggestions[suggestionIndex] is not defined or not an object');
                }
              }}
              fullWidth
              variant='outlined'
              size='small'
            />

            <InputLabel htmlFor={ `note-select-${suggestionIndex} `}></InputLabel>

            <Select
  id={ `note-select-${suggestionIndex} `}
  value={suggestion?.note !== null && suggestion?.note !== undefined ? suggestion.note : 'No Score'} // Définir une chaîne différente pour représenter le score "0"
  onChange={(e) => {
    const newNote = parseInt(e.target.value); // Utilisation de parseInt pour convertir en entier
    const newQuestion = { ...question };
    if (newQuestion.suggestions && typeof newQuestion.suggestions[suggestionIndex] === 'object') {
      newQuestion.suggestions[suggestionIndex].note = newNote;
      handleChange(sectionIndex,  `questions.${questionIndex} `, newQuestion);
    } else {
      console.error('suggestions[suggestionIndex] is not defined or not an object');
    }
  }}
  className={classes.noteSelect}
  style={{ minWidth: '80px', backgroundColor: '#4caf50', color: '#fff' }}
>
  {/* Options de note */}
  <MenuItem value="No Score">Score</MenuItem>
  <MenuItem value={0}>0</MenuItem>
  <MenuItem value={1}>1</MenuItem>
  <MenuItem value={2}>2</MenuItem>
  <MenuItem value={3}>3</MenuItem>
  {/* Ajoutez d'autres valeurs de note au besoin */}
</Select>



          </div>
        ))}

      <Button
        variant='contained'
        onClick={handleAddSuggestion}
        style={{ backgroundColor: '#4caf50', color: '#fff', marginBottom: '10px' }}
      >
        Add Suggestion
      </Button>
    </>

  );
};

export default SingleChoiceQuestion;
