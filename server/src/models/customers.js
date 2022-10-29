import Sequelize from 'sequelize';
import { sequelize } from '../database/database'
import Order from './orders';

const Customer =  sequelize.define('customers', {    
    customerId: {
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    lastName:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    firstName:{
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
            len: [0, 50]
        }
    },
    address:{
        type: Sequelize.DATE,
        defaultValue: null,
        validate: {
            len: [0, 255]
        }
    },
    phone: {
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

Order.belongsTo(Customer, {
    foreignKey: "customerId",
    as: "PK_Customer_Order",
});
Customer.hasMany(Order, {as: "orders"});

export default Customer;