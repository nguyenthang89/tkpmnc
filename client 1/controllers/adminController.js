const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
<<<<<<< HEAD
const { io } = require("socket.io-client");
const socket = io("http://localhost:8080");

socket.on("not-found", (args) => {
    console.log(args);
});
=======

>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
const dashboard = (req, res, next)=>{
    let phone = localStorage.getItem("phone-customer");
    if(phone){
        let data = {
            phone: localStorage.getItem('phone-customer')
        }
        let url = "http://localhost:8080/api/admin/get-top-5";
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('x-token')
            },
            body: JSON.stringify(data)
        }
        fetch(url, options)
        .then(response => response.json())
        .then(data => 
            res.render("admin/dashboard-admin.hbs", {
               topCall: data.data,
               topAddress: data.arr
            })
        )
        .catch(error => {
            console.log(error);
        })
    }
    else{
        res.render("admin/dashboard-admin.hbs");
    }
}
const getTop5Driver = async (req, res, next)=>{
    let url = "http://localhost:8080/api/admin/get-new-order";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-token")
        }
    }
    let data = await fetch(url, options).then(response => response.json());
    return data.responseData;
    
}
const coordinator = async (req, res, next)=>{
    let dataCustomer = await getTop5Driver();
    let data = {
        lastName: dataCustomer.lastName,
        firstName: dataCustomer.firstName,
        from: dataCustomer.departure,
        to: dataCustomer.destination,
        phone: dataCustomer.phone,
        lat: dataCustomer.startLat,
        long: dataCustomer.startLong,
        loai_xe: dataCustomer.loai_xe
    }
    let url = "http://localhost:8080/api/driver/top-nearby";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("x-token")
        },
        body: JSON.stringify(data)
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
const bookCar = (req, res, next)=>{
    res.render("admin/book-car.hbs");
}
const getLatLong = async (req, res, next)=>{
<<<<<<< HEAD
<<<<<<< HEAD
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req}&key=AIzaSyByBPtCdWW9S-HituC1L5NNoxUd-FDmx-0`;
=======
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req}&key=AIzaSyBde2G9TITk9v9V_hk-YZVy0HoCCEzVZGw`;
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
=======
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req}&key=AIzaSyBde2G9TITk9v9V_hk-YZVy0HoCCEzVZGw`;
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
    let responseData = await fetch(url).then(response => response.json());
    return responseData.results[0].geometry.location;
}
const postBookCar = async (req, res, next)=>{
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let from = req.body.from;
    let to = req.body.to;
    let phone = req.body.phone;
    let loai_xe = req.body.loaixe;
    let latLngForm = await getLatLong(from);
    let latLngTo = await getLatLong(to);
    localStorage.setItem('phone-customer', phone);
    let jsonDataBookCar = JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        from: from,
        to: to,
        phone: phone,
        startLat: latLngForm.lat,
        startLong: latLngForm.lng,
        endLat: latLngTo.lat,
        endLong: latLngTo.lng,
        loai_xe: loai_xe
    });

<<<<<<< HEAD
<<<<<<< HEAD
    data = { lat: latLngForm.lat, long: latLngForm.lng, phone: phone, from: from, to: to};
    socket.emit("TimTaiXe", data);
=======
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
=======
>>>>>>> c095854925a314c87064e6ce5e957a6cfd9820dc
    let url = 'http://localhost:8080/api/admin/coordinate';
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-token')
        },
        body: jsonDataBookCar,
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        res.render("admin/book-car", {message: data.message});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    dashboard,
    coordinator,
    bookCar,
    postBookCar
}