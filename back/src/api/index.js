//index
const express = require("express");
const registerApi =require("./register")
const loginApi = require("./login") 
const router =express.Router();
const entrepriseApi =require("./entreprise");
const quizApi =require("./quiz");
const questionApi =require("./question");
const suggestionApi =require("./suggestion");
const sectionApi =require("./section");
const openai_testApi =require("./openai_test");
const getQuizIdApi= require("./getQuizId")

const responseClientApi = require("./reponsesClient");

router.use(responseClientApi);
router.use(getQuizIdApi)
router.use(openai_testApi);
router.use(quizApi);
router.use(suggestionApi);
router.use(questionApi);
router.use(sectionApi);
router.use(registerApi);
router.use(loginApi)
router.use(entrepriseApi);




module.exports=router ;