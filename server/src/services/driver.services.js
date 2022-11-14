import User from '../models/users';
//import Sequelize from 'sequelize';
import Driver from '../models/drivers';
import { Router } from 'express';
const { Sequelize, QueryTypes } = require('sequelize');
import { sequelize }  from '../database/database';
import OrderService from './order.services';
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
      });
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
            message:"Oop! Something went wrong!"
        })
    }
  }

  static async topNearby(endLat, endLong) {   
    // let mySQL = `
    //   SELECT d.*, lat, d.Long, SQRT(
    //     POW(69.1 * (d.Long - ${endLat}), 2) +
    //     POW(69.1 * (${endLong} - d.Long) * COS(lat / 57.3), 2)) AS distance
    //   FROM drivers d HAVING distance < 2 ORDER BY distance LIMIT 5
    // `;

    let mySQL = `
      SELECT * FROM DRIVERS LIMIT 5
    `;
    const drivers = await sequelize.query(
      mySQL, 
    { type: QueryTypes.SELECT,
      logging: console.log,
    });

    return drivers;   
  }

  static async getInfoDriver(driverId) {   
    const driver = await Driver.findOne({
      where: {
        driverId: driverId,
      },
      logging: console.log
    });    
    return driver;     
  }  

}