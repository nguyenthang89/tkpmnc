import Sequelize from 'sequelize';
import { sequelize } from '../database/database'
import User from './users';

const Driver =  sequelize.define('drivers', {
    
    driverId: {
        type:Sequelize.INTEGER,
        allowNull: true,
    },
    lastName:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    firstName:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    birthDate:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    lat: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    long: {
        type: Sequelize.STRING,
        defaultValue: null
    }
},{
    timestamps: false
});


export default Driver;