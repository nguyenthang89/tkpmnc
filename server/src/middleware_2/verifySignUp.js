// const db = require("../models");

const User = require('../models/users');
const Role = require('../models/roles');

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user=> {
    if(user){
      res.status(400).send({
        message: "User name is already in use!"
      });
      return;
    };    

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user=> {
      if(user){
        res.status(400).send({
          message: "Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  Role.findOne({
    where: {
      name: req.body.roles
    }
  }).then(role=> {
    if(!role){
      res.status(400).send({
        message: "Role does not exits =" + req.body.roles[i]
      });
      return;
    };    
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;