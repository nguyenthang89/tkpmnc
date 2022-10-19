import User from '../models/users';
//import Sequelize from 'sequelize';
import Driver from '../models/drivers';
import { Router } from 'express';
const { Sequelize, QueryTypes } = require('sequelize');
import  sequelize from '../database/database';
const Op = Sequelize.Op;

export default class DriverService {

  constructor(){
    this.status = 400;
    this.dataRes = null;
  }

  static async infoUpd(id, param) {
    try{
      Driver.update(param, {
        where: { driverID: id },
        logging: console.log
      });
      return 1;        
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
  }

  static async latLongUpd(id, param) {
    try{      
      const [result] = await Driver.update(
        {
          lat: param.lat,
          long: param.long
        },        
        {
        where: {
          driverID: id
        },
        logging: console.log
      })
      ;

      return 1;  
   
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
  }

  static async topNearby() {
    const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });

    return users;
   
  }

}