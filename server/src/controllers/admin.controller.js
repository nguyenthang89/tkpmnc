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
export async function getTop5Address(req, res, next){   
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
      whereCondition.customerId = cus.customerId;
    }else{
      whereCondition.phone = req.body.phone;
    }

    await OrderService.saveOrder(obj);
    const dataRes = await OrderService.getTop5Address(whereCondition);   
    if(dataRes){
      return res.status(200).json({
        success: true,
        message:"Get " + dataRes.length + " recent called successfully",
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
      whereCondition.customerId = cus.customerId;
    }else{
      whereCondition.phone = req.body.phone;
    }

    await OrderService.saveOrder(obj);
    const dataResCalled = await OrderService.getTop5(whereCondition);   
    const dataResAddress = await OrderService.getTop5Address(whereCondition);   

    if(dataResCalled){
      return res.status(200).json({
        success: true,
        message:"Get " + dataResCalled.length + " recent called successfully",
        data: dataResCalled,
        array: dataResAddress,
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

