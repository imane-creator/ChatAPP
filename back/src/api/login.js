const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email
        const user = await User.findOne({ where: { email }});

        // Vérifier si l'utilisateur existe
          if (!user) {
        return res.status(401).json({ message: "Email or password does not match!" });
        }

        // Vérifier si le mot de passe correspond
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Email or password does not match!" });
        }
        req.session.userId = user.id;

        return res.json({ message: "Welcome back!", userId: user.id  , email, password});

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
