const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');
let data = localStorage.getItem('coordinator') ? JSON.parse(localStorage.getItem('coordinator')) : {};
console.log(data);
const dashboard = (req, res, next)=>{
    res.render("admin/dashboard-admin.hbs");
}
const coordinator = (req, res, next)=>{
    res.render("admin/coordinator.hbs", {data: dataCoordinator});
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

module.exports = {
    dashboard,
    coordinator,
    bookCar,
    postBookCar
}