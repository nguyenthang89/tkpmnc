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

  static async infoUpd(id, params) {
    try{
      await Driver.update(
      params,
      {
        where: id
      }
      );
      return 1;
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
  }

  static async latLongUpd(id, param) {
    try{      
      await Driver.update(
      {
        lat: param.lat,
        long: param.long
      },        
      {
      where: {
        driverID: id
      },
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

  static async topNearby() {
      //   SELECT latitude, longitude, SQRT(
      //     POW(69.1 * (latitude - [startlat]), 2) +
      //     POW(69.1 * ([startlng] - longitude) * COS(latitude / 57.3), 2)) AS distance
      // FROM TableName HAVING distance < 25 ORDER BY distance
    const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });

    return users;
   
  }

}