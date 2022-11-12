const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');

const dashboard = (req, res, next)=>{
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
const coordinator = (req, res, next)=>{
    let data = JSON.parse(localStorage.getItem("customer")) ? JSON.parse(localStorage.getItem("customer")) : "";
    let url = "http://localhost:8080/api/driver/top-nearby";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("x-token")
        },
        body: JSON.stringify(
            {
                lastName: data.lastName,
                firstName: data.firstName,
                from: data.from,
                to: data.to,
                lat: data.lat,
                long: data.long,
                phone: data.phone,
                loai_xe: data.loai_xe
            }
        )
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        res.render("admin/coordinator.hbs", {
            data: data
        });
    })
    .catch(err => console.log(err));
}
const bookCar = (req, res, next)=>{
    res.render("admin/book-car.hbs");
}

const postBookCar = (req, res, next)=>{
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let from = req.body.from;
    let to = req.body.to;
    let phone = req.body.phone;
    let loai_xe = req.body.loaixe;
    let lat = 11.89462;
    let long = 106.755173;
    localStorage.setItem('phone-customer', phone);
    let jsonDataBookCar = JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        from: from,
        to: to,
        phone: phone,
        lat: lat,
        long: long,
        loai_xe: loai_xe
    });
    
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
        res.redirect(307, "/admin/book-car");
    })
    .catch(err => {
        console.log(err);
    })
}

// const chooseDriver = (req, res, next) =>{
//     let driverID = req.body.driverID;
//     let data = {
//         driverID: driverID
//     }
//     let url = "http://localhost:8080/api/admin/send-message";
//     let options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': localStorage.getItem('x-token')
//         },
//         body: JSON.stringify(data)
//     }
//     fetch(url, options)
//     .then(response => response.json())
//     .then(data => {
//         res.render("admin/chooseDriver", {
//             message: data.data.responseData.message
//         })
//     })
//     .catch(err => console.log(err));
// }

module.exports = {
    dashboard,
    coordinator,
    bookCar,
    postBookCar,
    // chooseDriver
}