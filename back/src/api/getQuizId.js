//admin

const express = require('express');
const router = express.Router();


const Section = require('../models/section');
const Question = require('../models/question');
const Suggestion = require('../models/suggestion');

router.get('/getQuizId', async (req, res) => {
  const { quizId } = req.body;

  try {
    // Récupérer les sections du quiz à partir de la base de données
    const sectionsResults = await Section.findAll({ where: { quizId: quizId } });

    // Récupérer les questions de chaque section
    const sectionsWithQuestions = await Promise.all(sectionsResults.map(async section => {
      const questionsResults = await Question.findAll({ where: { sectionId: section.id } });
 const questionsWithSuggestions = await Promise.all(questionsResults.map(async question => {
        const suggestionsResults = await Suggestion.findAll({ where: { questionId: question.id } });
        return { ...question.toJSON(), suggestions: suggestionsResults.map(suggestion => suggestion.toJSON()) };
      }));

      return { ...section.toJSON(), questions: questionsWithSuggestions };
    }));
    res.status(200).json({ message: 'Quiz data retrieved successfully', quizData: sectionsWithQuestions });
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;