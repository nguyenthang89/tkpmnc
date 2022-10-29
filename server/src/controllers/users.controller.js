import User from '../models/users';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import UserSerive from '../services/user.services';
import { customRes } from '../utils/commonFunc';

export async function getAdminInfo(req, res, next) {
    let id  = req.body.id;
    console.log(id);
    // Lay user tu bang khach hang Customer, chua sua  Customerservice
    const dataRes = await UserSerive.getAdminInfo(id);
    console.log(dataRes);
    customRes(req, res, next, dataRes);
    
}

export async function updateUsers(req, res) {
    try{

        // Lay user tu bang khach hang Customer, chua sua
        let finddata = await User.findAll({
            where:{
                id:req.body.id
            }
        });
        if(finddata.length > 0){
            finddata.forEach(async data =>{
                await data.update(req.body)
            })
        }
        return res.json({
            success: true,
            message:"User Created Successfully",
            data:finddata
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
        })
    }
}
