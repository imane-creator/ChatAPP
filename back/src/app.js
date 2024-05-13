//app

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/passport");

require("./models/user");
require("./models/entreprise");
require("./models/section"); 
require("./models/quiz");
require("./models/suggestion");
require("./models/question");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "helooooooooo",
  });
});

app.use("/api/v1", api);
app.use(express.json());
app.use(middlewares.notFound);







app.use(middlewares.errorHandler);

module.exports = app;
