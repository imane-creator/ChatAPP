const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const ReponseClient = require('../models/reponseClient');
const Suggestion = require('../models/suggestion');
const Question = require('../models/question');
const Section = require('../models/section');

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

router.post('/soumettreEtTraiterQuiz', async (req, res) => {
  const { quizId, selectedSuggestionIds, message } = req.body;

  try {
    // Enregistrer les réponses du client
    await Promise.all(
      selectedSuggestionIds.map(async (suggestionId) => {
        const suggestion = await Suggestion.findByPk(suggestionId);
        
        if (suggestion) {
          const question = await Question.findByPk(suggestion.questionId); // Récupérer la question basée sur suggestion.questionId
          
          await ReponseClient.create({
            texte: suggestion.content,
            note: suggestion.note,
            questionId: suggestion.questionId,
            selection: true,
            quizId: quizId,
            sectionId: question.sectionId, // Utiliser question.sectionId au lieu de suggestion.sectionId
          });
        }
      })
    );

    // Récupérer les données du quiz
    const sectionsResults = await Section.findAll({ where: { quizId: quizId } });

    const sectionsWithQuestions = await Promise.all(sectionsResults.map(async section => {
      const questionsResults = await Question.findAll({ where: { sectionId: section.id } });
      
      const questionsWithSuggestions = await Promise.all(questionsResults.map(async question => {
        const suggestionsResults = await Suggestion.findAll({ where: { questionId: question.id } });
        return { ...question.toJSON(), suggestions: suggestionsResults.map(suggestion => suggestion.toJSON()) };
      }));

      return { ...section.toJSON(), questions: questionsWithSuggestions };
    }));

    // Envoyer les réponses du client et les données du quiz à l'API ChatGPT pour traitement
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'Vous êtes un assistant utile.' },
        { role: 'user', content: `Voici les réponses du client : ${JSON.stringify(selectedSuggestionIds)}` },
        { role: 'user', content: `Voici les données du quiz : ${JSON.stringify(sectionsWithQuestions)}` },
        { role: 'user', content: message },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const answer = completion.choices[0].message.content.trim();
    res.json({ response: answer });
  } catch (error) {
    console.error('Erreur lors du traitement du quiz:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
