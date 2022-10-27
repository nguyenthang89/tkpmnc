import Sequelize, { DataTypes } from 'sequelize';
import { sequelize } from '../database/database'
import User from './users';

const Role =  sequelize.define('roles', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING
    }},
    {
        timestamps:true
    }
);  

const UserRole = sequelize.define('user_roles', {
    roleId:{
        type:Sequelize.INTEGER,
        //primaryKey:true,
    },
    userId:{
        type: Sequelize.STRING,
        //primaryKey:true
    }
}
,{
    timestamps: true,
    defaultValue: Sequelize.NOW
});

User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", otherKey: "roleId" });
Role.belongsToMany(User, { through: UserRole , foreignKey: "roleId", otherKey: "userId" });
  // through is required!

// Role.hasMany(User, { as: "user"})
// User.belongsTo(Role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// })
export default Role;