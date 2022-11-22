import express, { Router } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//Importing Routes
import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';
import DriverRoutes from './routes/driver.routes';
import AdminRoutes from './routes/admin.routes';
import Order from './models/orders';
import Customer from './models/customers';
// import { addUser, getUser, getUsersInRoom, removeUser } from './utils/User';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')
import router from './routes/user.routes';
import DriverService from './services/driver.services';
const { topNearby } = require('./controllers/driver.controller');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: ["http://localhost:1000", "http://localhost:2000", "http://localhost:3000", "http://localhost:4000"],
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],

    allowedHeaders: ["x-access-token"],
    credentials: false
  }
});

//middlewares
// app.all('*', function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Max-Age", "3600");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
//     next(); 
// });

app.use(bodyParser.json({limit: '100mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'})); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 

var userConnected = {};
io.on("connection", (socket) => {
  // console.log(socket.id);
  //server lắng nghe tài xế nào join 
  socket.on('join', (data) => {
    userConnected[data] = socket.id;       
  });
  
  // Nhân viên điều phối sẽ gửi lat, long xuống
  socket.on("TimTaiXe", data => {
    // Lấy taiXe_id, find trong userCOnnnected.
    console.log(data);
    // let taiXe = await DriverService.topNearby(data);       
    // console.log(taiXe);
    // if(taiXe !== '0' && taiXe !== 'undefined' && userConnected[taiXe]){ 
    //   console.log(userConnected[taiXe], "Socket id của tai xe ");   
    //   io.sockets.to(userConnected[taiXe]).emit("found", "Tìm thấy tài xế");
    // }else{
    //   console.log("zo day, Socket id này là của sk ' socket.on '")
    //   io.sockets.to(socket.id).emit("not-found", "Không tìm thấy tài xế!!!");
    // }
  });
  socket.on("disconnect", () => {    
    // console.log(userConnected[21], socket.id);
    console.log(socket.id); // false
  });
 

})

//routes
app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/driver', DriverRoutes)
app.use('/api/admin', AdminRoutes)
//app.use('/api/auth/', AuthRoutes)
//app.post("signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);
// export default app;

app.set('port', process.env.PORT || 8080);

httpServer.listen(app.get('port'), function () {
    var port = httpServer.address().port;
    console.log('Running on : ', port);
});