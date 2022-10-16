'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();

let corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:3000", "http://localhost:3001"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
  res.json({message: "It's OK."});
})

//const db = require("./app/models");
const Role = db.role;

db.sequelize.sync()
  .then(() => {
    console.log("START SERVER");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

//require("./app/routes/tutorial.routes")(app);
require("./app/routes/driver.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})