import User from "../models/users";

export default class UserSerice {
  constructor(){
    this.dataRes = null;
  }

  static async getAdminInfo(id){
    let getData = await User.findOne({
      where:{
        id: id,
      },
      //logging: console.log,
    });    
    return getData;   
  }
}