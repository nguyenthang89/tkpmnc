import Order from "../models/orders";
import User from "../models/users";

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
  }
  
  static async getTop5(whereCondition){
    console.log(whereCondition);
    const history = await Order.findAll({
      where: whereCondition,
      attributes: ['customerId', 'phone', 'driverId', 'departure', 'destination', 'cre_dt', 'loai_xe',
    ],
      order: [
        ['cre_dt', 'DESC'],
      ],
      limit: 5,
      logging: console.log
    });
    return history;
  }

  static async getTop5Address(whereCondition){
    console.log(whereCondition);
    const history = await Order.findAll({
      where: whereCondition,
      attributes: ['customerId', 'phone', 'driverId', 'departure', 'destination', 'cre_dt', 'loai_xe'],
      order: [
        ['destination', 'DESC'],
      ],
      limit: 5,
      logging: console.log
    });
    return history;
  }
}