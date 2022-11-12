import Customer from "../models/customers";
import Driver from "../models/drivers";
import Role from "../models/roles";
import User from "../models/users";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const config = require("../config/auth.config");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

export default class AuthService {
  constructor(){
    this.dataRes = null;
  }

  static async signup(req, res, next){
    try {      
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }).then(user=> {   
        if(req.body.roles){
          //console.log(req.body.roles, "req.roles");
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              },
              //logging: console.log
            }
          }).then(roles => {
            user.setRoles(roles).then(()=> {
              console.log("OK");
              // res.send({
              //   message: "User was registered successfully!"
              // });
            });          
          });  
        }         
      });

      let user = await User.findOne({where:{
        username: req.body.username
      }});
      if(req.body.roles == 'driver'){        
        const res = await Driver.create({
          driverId: user.id,          
        }, { fields: ['driverId'] });
      }else if(req.body.roles == 'user'){       
        const res = await Customer.create({
          customerId: user.id,          
        }, { fields: ['customerId'] });
      };      
      
      return res.status(200).send({ message: "Registered successfully!" });

    } catch (err) {
      res.status(500).send({ message: err.message});
    }    
   

    // Chen
  }


  static async signin(req, res, next){
    try{
      let user = await User.findOne({where:{
          username: req.body.username
      }});

      if(!user){           
        return res.status(404).send({
          statusCode: 404,
          message: "User Not Found."
        });
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);  
      if(!passwordIsValid) {
        return res.status(401).send({
          statusCode: 401,
          token: null,
          message: "Invalid password."
        });
      }
      let token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400
      });
      
      // let userId = user.id;
      // //return driver Id for client test function
      // let driver = await Driver.findOne({
      //   where:{
      //   driverId: userId,
      // }});

      // if(!driver){
      //   driver = null;
      // }
      
      let authorities = [];    
      user.getRoles().then(roles => {
        for(let i = 0; i<roles.length; i++){
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          statusCode: 200,
          id: user.id,
          //driverId: driver.driverId,
          user: user.username,
          email: user.email,
          roles: authorities,
          token: token
        });            
      })  
    }
    catch(err){
      console.log(err);
      res.status(500).json({
          success: false,
          message:"Something went wrong!"
      })
    }
  }

}