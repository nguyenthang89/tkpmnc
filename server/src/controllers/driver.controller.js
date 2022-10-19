import User from '../models/users';
import Sequelize from 'sequelize';
import Driver from '../models/drivers';
import { Router } from 'express';
const Op = Sequelize.Op;

const router = Router();
import DriverService from '../services/driver.service'

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
  try{
    const id = req.body.driverId;
    const dataRes = await DriverService.infoUpd(id, req.body);   
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
