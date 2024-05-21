//client

const ReponseClient = require('../models/reponseClient');
const Suggestion = require('../models/suggestion');
const Question = require('../models/question'); // Update the import to the correct model
const express = require('express');
const router = express.Router();

router.post('/reponsesClient', async (req, res) => {
  const { quizId, selectedSuggestionIds } = req.body;

  try {
    await Promise.all(
      selectedSuggestionIds.map(async (suggestionId) => {
        const suggestion = await Suggestion.findByPk(suggestionId);
        
        if (suggestion) {
          const question = await Question.findByPk(suggestion.questionId); // Fetch the question based on suggestion.questionId
          
          const reponseClient = await ReponseClient.create({
            texte: suggestion.content,
            note: suggestion.note,
            questionId: suggestion.questionId,
            selection: true,
            quizId: quizId,
            sectionId: question.sectionId, // Use question.sectionId instead of suggestion.sectionId
          });
        }
      })
    );

    res.status(200).json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;