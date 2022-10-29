import Sequelize from 'sequelize';
import { sequelize } from '../database/database'

const Order =  sequelize.define('orders', {    
    orderId: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId:{
        type: Sequelize.INTEGER,
    },
    driverId:{
        type: Sequelize.STRING,
    },
    departure:{
        type: Sequelize.STRING,
        validate: {
            len: [0, 255]
        }
    },
    destination:{
        type: Sequelize.STRING,
        validate: {
            len: [0, 255]
        }
    },
    startLat: {
        type: Sequelize.FLOAT,
    },
    startLong: {
        type: Sequelize.FLOAT,
    },
    endLat: {
        type: Sequelize.FLOAT,
    },
    endLong: {
        type: Sequelize.FLOAT,
    },
    loai_xe:{
        type: Sequelize.STRING,
        validate: {
            len: [0, 1]
        }
    },    
    cre_dt: {
        type: Sequelize.DATE,
    },
},{
    timestamps: false
});

export default Order;