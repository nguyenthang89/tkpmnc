//const db = require("../models");
const config = require("../config/auth.config");
import e from 'express';
//const User =  require('../models/users');
import Role from '../models/roles';
import User from '../models/users';
//const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

export function signup (req, res){
  //Save
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user=> {
    if(req.body.roles){
      console.log(req.body.roles, "req.body.roles");
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          },
          //logging: console.log
        }
      }).then(roles => {
        user.setRoles(roles).then(()=> {
          res.send({
            message: "User was registered successfully!"
          });
        });
      });
    }else{
      user.setRoles([1]).then(() => {
        res.send({
          message: "User was registered successfully!"
        });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message});
  });
}

export async function signin(req, res, next){   

  try{
    let user = await User.findOne({where:{
        username: req.body.username
    }});
    if(!user){           
      return res.status(404).send({message: "User Not Found."});
    }
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if(!passwordIsValid) {
      return res.status(401).send({
        token: null,
        message: "Invalid password."
      });
    }
    let token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400
    });
    
    let authorities = [];    
    user.getRoles().then(roles => {
      for(let i = 0; i<roles.length; i++){
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        user: user.username,
        email: user.email,
        roles: authorities,
        token: token
      });   
          
    })

  }
  catch(err){
    console.log(err);
    res.status(500).json({
        success: false,
        message:"Something went wrong!"
    })
}

  
};

