import Order from "../models/orders";
import User from "../models/users";

export default class OrderService {
  constructor(){
    this.dataRes = null;
  }

  static async saveOrder(params){
    console.log(params);
    await Order.create({ 
      endLat: params.lat, 
      endLong: params.long, 
      customerId: 9,
      departure: params.from,
      destination: params.to,
      loai_xe: params.loai_xe
    });

    //return result;
    // let getData = await User.findOne({
    //   where:{
    //     id: id,
    //   },
    //   logging: console.log,
    // });    
    // return getData;   
  }
}