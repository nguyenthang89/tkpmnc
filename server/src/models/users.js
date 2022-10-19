import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const User =  sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING,
        unique: true
    },
    password:{
        type: Sequelize.STRING
    }
},{
    timestamps: true
});
 

export default User;