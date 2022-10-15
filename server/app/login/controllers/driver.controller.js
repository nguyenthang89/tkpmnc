const db = require("../../driver/models");
const Driver = db.drivers;
const Op = db.Sequelize.Op;

// Find a single Driver with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Driver.findOne({ where: { driverID: id } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find driver with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving driver with id=" + id
      });
    });
};

// Update a Driver by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Driver.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Driver was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Driver with id=${id}. Maybe Driver was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Driver with id=" + id
      });
    });
};

