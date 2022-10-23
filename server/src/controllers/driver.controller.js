import User from '../models/users';
import Sequelize from 'sequelize';
import Driver from '../models/drivers';
import DriverService from '../services/driver.service';

import e, { Router } from 'express';
const Op = Sequelize.Op;

const router = Router();


// router.post('', async(req, res, next) => {
//   try {
//     const id = req.body.driverId;

//     const dataRes = await DriverService.infoUpd(id, req.body);
//     if(dataRes === 1){
//       return res.status(200).json({
//         success: true,
//         message: 'Update driver successfully'
//       })
//     }
//   } catch (error) {
//     console.log();
//   }
// })

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

export async function topNearby(req, res, next){   
  try{
    //const id = req.body.driverId;
    const dataRes = await DriverService.topNearby();   
    if(dataRes === 1){
      return res.status(200).json({
        success: true,
        message:"Driver update successfully",
        data: dataRes
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
