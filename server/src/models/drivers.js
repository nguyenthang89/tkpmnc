import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Driver =  sequelize.define('drivers', {
    driverID: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    lastName:{
        type: Sequelize.STRING
    },
    firstName:{
        type: Sequelize.STRING,
        unique: true
    },
    birthDate:{
        type: Sequelize.DATE
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    lat: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    long: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
},{
    timestamps: false
});
 

export default Driver;