const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const Entreprise = require("../models/entreprise");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return Entreprise.findOne({ where: { id: jwtPayload.id } })
        .then((entreprise) => {
          return done(null, entreprise);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
