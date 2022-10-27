//const db = require("../models");
import e from 'express';
//const User =  require('../models/users');
import Role from '../models/roles';
import User from '../models/users';
import AuthService from '../services/auth.service';
import { customRes } from '../utils/commonFunc';
//const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// Dang ki
export async function signup (req, res, next){
  try {
    await AuthService.signup(req, res, next);   
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
        success: false,
        message:err.message + " Oop! Something went wrong!"
    });
  };
}

export async function signin(req, res, next){   
  // const username = req.body.username;
  // const password = req.body.password.  
  try {    
    await AuthService.signin(req, res, next);   
  } 
  catch (error) {
    console.log(err);
    res.status(500).json({
        success: false,
        message:err.message + " Oop! Something went wrong!"
    });
  };  
};
