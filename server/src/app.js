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
    origin: ["http://localhost:3000", "http://localhost:2000"],
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

var arr = [];
var admin = [];
io.on("connection", (socket) => {
  console.log(socket.id, "connected"); // true

  
  //server lắng nghe tài xế nào join 
  socket.on('join', (data) => {
        
    io.sockets.emit("resposeFromServer", { message: " Đăng kí nhận thông báo thành công"}); //Subscribe successfully
    //io.sockets.to().emit("pri", "private message");
    // var clientInfo = new Object();            
    // clientInfo.clientId     = socket.id;
    // clients.push(clientInfo);
    // console.log(clientInfo[1]); // Lm0sw7-EvGXOX4myAAAC


  });
  
  
  //io.to(socket.id).emit('pri', `your secret code is `);
  //console.log(socket.id);
  socket.on("lat-long-frmClient", async(data) => {
    // console.log(arr[1]); // undefined

    //let result = await DriverService.topNearby(data);
    // io.sockets.to(arr[1]).emit("pri", "Private message "); 
    console.log(socket.id, "adminnn");
    // console.log(result.toString());
    // if(result){      
      
    //   //io.sockets.to(socket.id).emit("messageForAdmin", { message: "Mảng đang rỗng "});
    //   console.log(socket.id, "admin socket it 111");
    //   io.sockets.to(socket.id).emit("messageForAdmin", "private message");
    //   io.to(socket.id).emit("messageForAdmin", "private message");
    // }else{
    //   io.to(socket.id).emit("messageForAdmin", { message: " Không có tài xế "});
    //   console.log(socket.id, "admin socket it 222");
    // }
   
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