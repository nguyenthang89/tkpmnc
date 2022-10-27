import e from 'express';
import Role from '../models/roles';
import User from '../models/users';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export  async function checkDuplicateUsernameOrEmailOrExistRole (req, res, next) {
  try {
    //console.log(req.body.username, "req.body.username");
    let user = await User.findOne({where:{
      username: req.body.username
    }});

    if(user){
      res.status(400).send({
        message: "User name is already in use!"
      });
      return;
    }  
  
    let email = await User.findOne({where:{
      email: req.body.email
    }});

    if(email){
      res.status(400).send({
        message: "Email is already in use!"
      });
      return;
    }

    let role = await Role.findOne({where:{
      name: req.body.roles
    }});

    if(!role){
      res.status(400).send({
        message: "Role does not exits!"
      });
      return;
    }

    next();
  } catch (error) {
    console.log(error.message);
    return;
  }
  
};
