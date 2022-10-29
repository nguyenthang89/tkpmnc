import Order from "../models/orders";
import User from "../models/users";

export default class OrderService {
  constructor(){
    this.dataRes = null;
  }

  static async saveOrder(params){
    console.log(params);
    await Order.create({ 
      startLat: params.lat, 
      startLong: params.long, 
      customerId: 9
    });
    // let getData = await User.findOne({
    //   where:{
    //     id: id,
    //   },
    //   logging: console.log,
    // });    
    // return getData;   
  }
}