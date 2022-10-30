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

export async function coordinate(req, res, next){   
  try{
    const inputs = req.body;
    const obj = {};
    const id = {};
    for (var key of Object.keys(inputs)) {
      obj[key] = `${inputs[key]}`;      
    }
    // Kiem tra xem co phai la khach vang lai ko
    let cus = await Customer.findOne({
      attributes: ['customerId'],
      where:{
        phone: req.body.phone,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
      },
      logging: console.log,
    });    
    
    if(cus){
      obj.customerId = cus.customerId;
    }    

    await OrderService.saveOrder(obj);
    const dataRes = await OrderService.getTop5(cus.customerId);   
    if(dataRes){
      return res.status(200).json({
        success: true,
        message:"Hello world!! :)) ",
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

