const express = require("express");
const Entreprise = require("../models/entreprise");
const Quiz = require("../models/quiz");
const router = express.Router();

require("dotenv").config();

router.get("/allentreprises", async (req, res) => {
  try {
    const entreprises = await Entreprise.findAll();
    res.status(200).json(entreprises);
  } catch (error) {
    console.error("Error fetching entreprises:", error);
    res.status(500).json({ error: "Cannot fetch entreprises at the moment" });
  }
});

module.exports = router;

router.get("/entrepriseId/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entreprise = await Entreprise.findByPk(id);

    if (!entreprise) {
      return res.status(404).json({ message: "Entreprise not found" });
    }

    res.status(200).json(entreprise);
  } catch (error) {
    console.error("Error fetching entreprise:", error);
    res.status(500).json({ error: "Cannot fetch entreprise at the moment" });
  }
});

router.post("/entreprise", async (req, res) => {
  try {
    // Accéder à l'ID de l'utilisateur à partir de la session
    // const userId = req.session.user.id;
    const {
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
    } = req.body;

    const alreadyExistEntreprise = await Entreprise.findOne({
      where: { name },
    });
    if (alreadyExistEntreprise) {
      return res
        .status(400)
        .json({ message: "Entreprise with name already exists!" });
    }

    // Créer une nouvelle entreprise avec l'ID de l'utilisateur
    const newEntreprise = await Entreprise.create({
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
    res
      .status(201)
      .json({ message: "Thanks for registering", entreprise: newEntreprise });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Cannot register entreprise at the moment" });
  }
});

// PUT method for updating company information
router.put("/entreprise/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the entreprise to update
    const {
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
    } = req.body;

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

    res.status(200).json({
      message: "Entreprise updated successfully",
      entreprise: existingEntreprise,
    });
  } catch (error) {
    console.error("Error updating entreprise:", error);
    res.status(500).json({ error: "Cannot update entreprise at the moment" });
  }
});

// DELETE method for deleting an entreprise
router.delete("/entreprise/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID of the entreprise to delete

    // Check if the entreprise exists
    const existingEntreprise = await Entreprise.findByPk(id);
    if (!existingEntreprise) {
      return res.status(404).json({ message: "Entreprise not found" });
    }

    // Delete the entreprise from the database
    await existingEntreprise.destroy();

    res.status(200).json({
      message: "Entreprise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting entreprise:", error);
    res
      .status(500)
      .json({ error: "this enterprise have a quizz, delete quizz first" });
  }
});

module.exports = router;
