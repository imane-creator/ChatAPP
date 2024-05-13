const express = require('express');
const Question = require('../models/question');

const router = express.Router();


router.get('/questions', async (req, res) => {
  const sectionId = req.query.sectionId; // Récupérer le sectionId depuis les paramètres de requête

  try {
    // Utiliser sectionId pour filtrer les questions liées à cette section
    const questions = await Question.findAll({ where: { sectionId } });
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Cannot fetch questions at the moment' });
  }
});


router.post('/questions', async (req, res) => {
  try {
    const questionsData = req.body; // Récupérer les données de toutes les questions envoyées

    const createdQuestions = []; // Initialiser un tableau pour stocker les questions créées

    // Parcourir les données de chaque question
    for (const questionData of questionsData) {
      const { texte, type, sectionId } = questionData;

      // Créer la question
      const question = await Question.create({ texte, type, sectionId });

      // Ajouter la question créée au tableau des questions créées
      createdQuestions.push(question);
    }

    // Envoyer une réponse avec le statut 201 et les données des questions créées
    res.status(201).json({ message: 'Questions created successfully', questions: createdQuestions });
  } catch (error) {
    // Si une erreur se produit lors de la création des questions, la capturer
    console.error('Error creating questions:', error);
    
    // Envoyer une réponse d'erreur avec le statut 500 et un message d'erreur approprié
    res.status(500).json({ error: 'Cannot create questions at the moment', errorMessage: error.message });
  }
});

module.exports = router;