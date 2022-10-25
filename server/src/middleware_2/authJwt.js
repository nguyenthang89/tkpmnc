const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
//const { role } = require("./models");
const {role} = require("../models/roles");
const {User} = require("../models/users");
// const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if(!token){
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  
  jwt.verify(token, config.secret, (err, decoded)=> {
    console.log(token, 'toklen');
    if(err){
      return res.status(401).send({
        message: "Unauthorized1231231!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res ,next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require admin role!"
      });

      return;
    });
  });
};

const isDriver = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++){
        if(roles[i].name === "driver"){
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require driver role!"
      });
    });
  });
};

const isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++){
        if(roles[i].name === "user"){
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require user role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDriver: isDriver,
  isUser: isUser,
}

module.exports = authJwt;