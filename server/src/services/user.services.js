import User from "../models/users";

export default class UserSerice {
  constructor(){
    this.dataRes = null;
  }

  static async getUser(input, req, res, next){
    console.log(input, "input");   
    let getData = await User.findOne({where:{
        id: input.id
    }});    
    return getData;   
  }
}