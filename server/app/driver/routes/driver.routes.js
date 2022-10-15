module.exports = app => {
  // const tutorials = require("../controllers/tutorial.controller");
  const drivers = require("../../login/controllers/driver.controller");

  var router = require("express").Router();
  
  router.put("/:id", drivers.update);
  router.get("/:id", drivers.findOne);
  app.use('/api/drivers', router);
}