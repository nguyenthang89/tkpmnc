module.exports = (sequelize, Sequelize) => {
  const Drivers = sequelize.define("drivers", {
    driverID: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    lastName: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATE
    },
    address:{
      type: Sequelize.STRING
    },
    phone:{
      type: Sequelize.STRING
    },    
    photo:{
      type: Sequelize.BLOB
    },   
    lat:{
      type: Sequelize.FLOAT
    },
    long:{
      type: Sequelize.FLOAT
    }        
    },
    {
      timestamps: false
    });
  return Drivers;
};