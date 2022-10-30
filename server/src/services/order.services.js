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
      phone: params.phone
    });   
  }

  static async getTop5(cusId){
    console.log(cusId);
    const history = await Order.findAll({
      where: {
        customerId: cusId
      },
      attributes: ['customerId', 'phone', 'driverId', 'departure', 'destination', 'cre_dt', 'loai_xe'],
      order: [
        ['cre_dt', 'DESC'],
      ],
      limit: 5,
    });

    return history;
  }
}