//api
const express = require('express');
const Section = require('../models/section');
const Quiz = require('../models/quiz')
const router = express.Router();


require("dotenv").config();

router.post('/sections', async (req, res) => {
  try {
    const sectionsData = req.body; // Obtenez les données de toutes les sections envoyées
console.log('dkhl section');
    const createdSections = [];
    for (const sectionData of sectionsData) {
      const { title, texte, quizId } = sectionData;

      // Vérifier si le quiz existe
      const existingQuiz = await Quiz.findByPk(quizId);
      if (!existingQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

    

      // Créer une nouvelle section pour le quiz spécifié
      const newSection = await Section.create({ texte, title, quizId });
      createdSections.push(newSection);
    }

    res.status(201).json({ message: 'Sections created successfully', sections: createdSections });
  } catch (error) {
    console.error('Error creating sections:', error);
    res.status(500).json({ error: 'Cannot create sections at the moment' });
  }
});

router.get('/sections', async (req, res) => {
  const quizId = req.query.quizId; // Récupérer le quizId depuis les paramètres de requête

  try {
    // Utiliser quizId pour filtrer les sections liées à ce quizId
    const sections = await Section.findAll({ where: { quizId } });
    res.status(200).json({ sections });
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Cannot fetch sections at the moment' });
  }
});



module.exports = router;