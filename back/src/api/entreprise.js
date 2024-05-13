const express = require("express");
const Entreprise = require("../models/entreprise");
const router = express.Router();
//const verifyToken = require("../middleware");

require("dotenv").config();



router.post("/entreprise", async (req, res) => {
  try {
    // Accéder à l'ID de l'utilisateur à partir de la session
   // const userId = req.session.user.id;
    const { name, adresse, email,IF,RC,ICE,LegalStatus,Sector,Goals, userId } = req.body;
    
    const alreadyExistEntreprise = await Entreprise.findOne({ where: { name } });
    if (alreadyExistEntreprise) {
      return res.status(400).json({ message: "Entreprise with name already exists!" });
    }

    // Créer une nouvelle entreprise avec l'ID de l'utilisateur
    const newEntreprise = await Entreprise.create({ name, adresse, email,IF,RC,ICE,LegalStatus,Sector,Goals, userId});
    res.status(201).json({ message: "Thanks for registering", entreprise: newEntreprise });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Cannot register entreprise at the moment" });
  }
});

// PUT method for updating company information
router.put("/entreprise/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the entreprise to update
    const { name, adresse, email, IF, RC, ICE, LegalStatus, Sector, Goals, userId } = req.body;

    // Check if the entreprise exists
    const existingEntreprise = await Entreprise.findByPk(id);
    if (!existingEntreprise) {
      return res.status(404).json({ message: "Entreprise not found" });
    }

    // Update the existing entreprise with new data
    await existingEntreprise.update({
      name,
      adresse,
      email,
      IF,
      RC,
      ICE,
      LegalStatus,
      Sector,
      Goals,
      userId,
    });

    res.status(200).json({ message: "Entreprise updated successfully", entreprise: existingEntreprise });
  } catch (error) {
    console.error("Error updating entreprise:", error);
    res.status(500).json({ error: "Cannot update entreprise at the moment" });
  }
});


module.exports = router;