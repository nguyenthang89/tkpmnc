const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const http = require('http');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// Views
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');


//Router
const signinRoutes = require('./routers/signin');
app.use('/', signinRoutes);

const signupRoutes = require('./routers/signup');
app.use('/signup', signupRoutes);

const adminRoutes = require('./routers/admin');
app.use('/admin', adminRoutes);

const driverRoutes = require('./routers/driver');
app.use('/driver', driverRoutes);


const listener = app.listen(process.env.PORT || 5000, ()=>{
    console.log('Website is listening on port ' + listener.address().port);
})