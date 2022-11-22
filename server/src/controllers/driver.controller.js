import User from '../models/users';
import Sequelize from 'sequelize';
import Driver from '../models/drivers';
import DriverService from '../services/driver.services';

import e, { Router } from 'express';
import Order from '../models/orders';
import Customer from '../models/customers';
import OrderService from '../services/order.services';
const Op = Sequelize.Op;

const router = Router();

export async function infoUpd(req, res) {
  const inputs = req.body;
  const obj = {};
  const id = {};
  for (var key of Object.keys(inputs)) {
    if(key !== 'driverId'){
      obj[key] = `${inputs[key]}`;
    }else{
      id[key] = `${inputs[key]}`;
    }
  }

  try{
    if(!req.body.driverId){
      throw new TypeError("Cannot update!!");
    }
    const dataRes = await DriverService.infoUpd(id, obj);   
    if(dataRes === 1){
      return res.status(200).json({
        success: true,
        message:"Driver update successfully",
        //data: req.body
      });
    }else{
      return res.status(400).json({
        success: false,
        message:"Driver update failed",
        //data: req.body
      });
    }    
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:err.message + " Oop! Something went wrong!"
      })
  }
}


export async function latLongUpd(req, res, next){     
  try{
    if(!req.body.driverId){
      throw new TypeError("Cannot update!!");
    }
    const id = req.body.driverId;
    const dataRes = await DriverService.latLongUpd(id, req.body);   
    if(dataRes === 1){
      return res.status(200).json({
        success: true,
        message:"Driver update successfully",
        //data: req.body
      });
    }    
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
  }
}

export async function topNearby(params){    
    const inputs = params;
    const obj = {};
    const id = {};
    for (var key of Object.keys(inputs)) {
      obj[key] = `${inputs[key]}`;      
    }

    console.log(obj, "objectt");
    DriverService.topNearby(obj);  
}


export async function getInfoDriver(req, res, next){  
  const driverId = req.body.driverId; 
  try{   
    const dataRes = await DriverService.getInfoDriver(driverId);   
    if(dataRes){
      return res.status(200).json({
        success: true,
        message:"Get drivers successfully",
        data: dataRes
      });
    }else{
      return res.status(200).json({
        success: false,
        message:"Failed, please contact admin to more details.",
        data: null
      });
    }   
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
  }
}
