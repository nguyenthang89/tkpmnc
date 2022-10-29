const fetch = require('node-fetch');
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage('./scratch');

const dashboard = (req, res, next)=>{
    let data = localStorage.getItem('info-driver') ? JSON.parse(localStorage.getItem('info-driver')) : {};
    let id = localStorage.getItem('id');
    let showInfo = null;
    if(data.driverId == id){
        showInfo = data
    }
    res.render("driver/dashboard-driver.hbs", {
        data: showInfo
    });
}
const updateInfo = (req, res, next)=>{
    res.render("driver/update-info.hbs");
}

const postUpdateInfo = (req, res, next)=>{
    let driverId = localStorage.getItem('id');
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let birthDate = req.body.birthDate;
    let address = req.body.address;
    let phone = req.body.phone;
    let photo = "";
    let dataJson = JSON.stringify({
        driverId: driverId,
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        address: address,
        phone: phone,
        photo: photo
    });
    let url = "http://localhost:8080/api/driver/info-driver-upd";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-token')
        },
        body: dataJson
    }
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('info-driver', dataJson);
        res.render('driver/update-info.hbs', {message: data.message});
    })
    .catch(err => {
        console.log(err);
    })
}
module.exports = {
    dashboard,
    updateInfo,
    postUpdateInfo
}