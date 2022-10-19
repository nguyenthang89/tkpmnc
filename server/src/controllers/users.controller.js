import User from '../models/users';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export async function getUsers(req, res, next) {
    try{
        let getdata = await User.findOne({where:{
            username: req.body.username
        }});
        if(getdata){           
            res.json({
                success: true,
                message:"User Fetch Successfully",
                data:getdata
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

export async function updateUsers(req, res) {
    try{
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
