import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// Jwt strategy
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if(!token){
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  
  jwt.verify(token, config.secret, (err, decoded)=> {
    if(err){
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// passport.use(jwtStrategy);

// export const authJwt = passport.authenticate('jwt', {
//   session: false,
// });

