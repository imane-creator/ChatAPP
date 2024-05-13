const express = require('express');
const router = express.Router();
const Suggestion = require('../models/suggestion');

router.post('/suggestions', async (req, res) => {
  try {
    const suggestionsData = req.body; // Récupérer les données de toutes les suggestions envoyées
    
    const createdSuggestions = []; // Initialiser un tableau pour stocker les suggestions créées

    // Parcourir les données de chaque suggestion
    for (const suggestionData of suggestionsData) {
      const { content, questionId ,note } = suggestionData;

      // Créer la suggestion
      const newSuggestion = await Suggestion.create({ content, questionId ,note });

      // Ajouter la suggestion créée au tableau des suggestions créées
      createdSuggestions.push(newSuggestion);
    }

    // Envoyer une réponse avec le statut 201 et les données des suggestions créées
    res.status(201).json({ message: 'Suggestions created successfully', suggestions: createdSuggestions });
  } catch (error) {
    console.error('Error creating suggestions:', error);
    // Envoyer une réponse d'erreur avec le statut 500 et un message d'erreur approprié
    res.status(500).json({ error: 'Cannot create suggestions at the moment', errorMessage: error.message });
  }
});
router.get('/suggestions', async (req, res) => {
  const questionId = req.query.questionId; // Récupérer le questionId depuis les paramètres de requête

  try {
    // Utiliser questionId pour filtrer les suggestions liées à cette question
    const suggestions = await Suggestion.findAll({ where: { questionId } });
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Cannot fetch suggestions at the moment' });
  }
});

module.exports = router;
