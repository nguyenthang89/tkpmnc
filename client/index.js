const express = require("express");
const ejs = require("ejs");
const https = require("https");
const axios = require('axios')
const http = require('http');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
})
// Đăng ký
app.post("/signup", function(req, res){
    let role = req.body.userRoles;
    let registerUsername = req.body.registerUsername;
    let registerEmail = req.body.registerEmail;
    let registerPassword = req.body.registerPassword;
    let jsonDataSignup = JSON.stringify({
        "username": registerUsername,
        "email": registerEmail,
        "password": registerPassword,
        "roles": [role]
    })
    let optionsSignup = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/api/auth/signup',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let requestSignup = http.request(optionsSignup, (response)=>{
        if(response.statusCode === 200){
            response.on("data", (data)=>{
                res.render('index');
            })
        }
        else{
            res.render("index")
        }
    })
    requestSignup.on("error", (err)=>{
        console.log(err);
    })
    requestSignup.write(jsonDataSignup);
    requestSignup.end();
})
//Đăng nhập
app.post("/admin", function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    let dataSignin = {
        "username": username,
        "password": password
    }
    let jsonDataSignin = JSON.stringify(dataSignin);
    let optionsSignin = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/api/auth/signin',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let requestSignin = http.request(optionsSignin, (response)=>{
        if(response.statusCode === 200){
            response.on("data", (data)=>{
                let dataQueue = JSON.parse(data);
                let role = dataQueue.roles[0];
                localStorage.setItem('x-token', dataQueue.token);
                switch(role){
                    case "ROLE_ADMIN":
                        res.render("dashboard-admin");
                        break;
                    case "ROLE_DRIVER":
                        res.render("dashboard-driver",{
                            idDriver: dataQueue.id
                        });
                        break;
                    default:
                        res.redirect("/");
                        break;
                }

            })
            
        }
        else{
            res.redirect("/");
        }
    })
    requestSignin.on('error', (err)=>{
        console.log(err);
    })
    requestSignin.write(jsonDataSignin);
    requestSignin.end();
})

app.post("/dashboard-driver", function(req, res){
    let id = req.body.idDriver;

    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let birthDate = req.body.birthDate;
    let address = req.body.address;
    let phone = req.body.phone;
    let photo = "";

    let jsonDataDriver = JSON.stringify({
        driverID: id,
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        address: address,
        phone: phone,
        photo: photo
    })
    console.log(jsonDataDriver);
    // let optionsDriver = {
    //     hostname: '127.0.0.1',
    //     port: 8080,
    //     path: '/api/driver/info-driver-upd',
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': localStorage.getItem('x-token')
    //     }
    // }
    // let requestDriver = http.request(optionsDriver, (response)=>{
    //     if(response.statusCode === 200){
    //         response.on("data", (data)=>{
    //             res.redirect("/dashboard-driver");
    //         })
    //     }
    // })
    // requestDriver.on("error", (err)=>{
    //     console.log(err);
    // })
    // requestDriver.write(jsonDataDriver);
    // requestDriver.end();
})


app.post("/form", function(req, res){
    let customerName = req.body.customerName;
    let customerPhone = req.body.customerPhone;
    let addressStart = req.body.addressStart;
    let addressEnd = req.body.addressEnd;
    let typeCar = req.body.typeCar;
    const data = {

    }
    res.render("form");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})