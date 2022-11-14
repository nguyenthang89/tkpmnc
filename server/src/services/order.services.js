import Order from "../models/orders";
import User from "../models/users";
const { Sequelize, QueryTypes } = require('sequelize');
import { sequelize }  from '../database/database';

export default class OrderService {
  constructor(){
    this.dataRes = null;
  }

  static async saveOrder(params){
    //console.log(params);
    await Order.create({
      endLat: params.lat, 
      endLong: params.long, 
      customerId: params.customerId,
      departure: params.from,
      destination: params.to,
      loai_xe: params.loai_xe,
      phone: params.phone,
      //logging: console.log
    });   
    return 1;
  }
  
  static async getTop5RecentCalled(){
    let mySQL = `
      SELECT a.customerId, lastName, firstName, s.phone, driverId, departure, destination, cre_dt, loai_xe 
      FROM mytrip.orders s left join customers a on s.phone = a.phone 
      ORDER BY cre_dt 
      LIMIT 5
    `;

    const history = await sequelize.query(
      mySQL, 
      { type: QueryTypes.SELECT,
        logging: console.log,
      });

    // const history = await Order.findAll({
    //   where: whereCondition,
    //   attributes: ['customerId', 'phone', 'driverId', 'departure', 'destination', 'cre_dt', 'loai_xe',
    // ],
    //   order: [
    //     ['cre_dt', 'DESC'],
    //   ],
    //   limit: 5,
    //   logging: console.log
    // });
    return history;
  }

  static async getTop5Address(){
    let mySQL = `
      SELECT a.customerId, lastName, firstName, s.phone, driverId, departure, count(destination) count, cre_dt, loai_xe 
        FROM mytrip.orders s  join customers a on s.phone = a.phone ORDER BY count desc 
        LIMIT 5
      `;
    // const history = await Order.findAll({
    //   where: whereCondition,
    //   attributes: ['customerId', 'phone', 'driverId', 'departure', 'destination', 'cre_dt', 'loai_xe'],
    //   order: [
    //     ['destination', 'DESC'],
    //   ],
    //   limit: 5,
    //   logging: console.log
    // });
    const history = await sequelize.query(
      mySQL, 
      { type: QueryTypes.SELECT,
        logging: console.log,
      });
    return history;
  }
}