const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const alreadyExistUser = await User.findOne({ where: { email } });
    if (alreadyExistUser) {
      return res.status(400).json({ message: "User with email already exists!" });
    }

    // Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe crypté
    const newUser = await User.create({ fullName, email, password: hashedPassword });
    res.status(201).json({ message: "Thanks for registering", user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Cannot register user at the moment" });
  }
});

module.exports = router;
