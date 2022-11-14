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
export async function getTop5ByCellPhone(req, res, next){   
  try{
    // const whereCondition = {};
    // whereCondition.phone = req.body.phone; 

    const dataResAddress = await OrderService.getTop5Address();   
    const dataResRecentCalled = await OrderService.getTop5RecentCalled();   
    if(dataResAddress && dataResRecentCalled){
      return res.status(200).json({
        success: true,
        message:"Get " + dataResRecentCalled.length + " recent called successfully",
        //message2:"Get " + dataResAddress.length + " recent called successfully",
        data: dataResAddress,
        arr: dataResRecentCalled
      });
    }else{
      return res.status(400).json({
        success: false,
        message:"BAD REQUEST"
      });
    }  
   
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message: err.message
      })
  }
};

export async function coordinate(req, res, next){   
  try{
    const inputs = req.body;
    const obj = {};
    const id = {};
    const whereCondition = {};
    for (var key of Object.keys(inputs)) {
      obj[key] = `${inputs[key]}`;      
    }
    
    let cus = await Customer.findOne({
      attributes: ['customerId'],
      where:{
        phone: req.body.phone,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
      },
      logging: console.log,
    });    
    
    // Kiem tra xem co phai la khach vang lai ko
    if(cus){
      obj.customerId = cus.customerId;
    };

    const dataRes = await OrderService.saveOrder(obj);

    if(dataRes === 1){
      return res.status(200).json({
        success: true,
        message:"Save successfully"        
      });
    }    
   
  }catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
  }
};

