'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/login/models");
const app = express();

let corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:3000", "http://localhost:3001"]
}

process.title = 'node-chat';

let webSocketsServerPort = 1337;

let webSocketServer = require('websocket').server;
let http = require('http');

let history = [];

let clients = [];

function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a,b) { return Math.random() > 0.5; } );

let server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});

server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});

/**
 * WebSocket server
 */
 let wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  let connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  let index = clients.push(connection) - 1;
  let userName = false;
  let userColor = false;
  console.log((new Date()) + ' Connection accepted.');
  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(
        JSON.stringify({ type: 'history', data: history} ));
  }
  // user sent some message
  connection.on('message', function(message) {
    console.log(message, "sdadassds");
    if (message.type === 'utf8') { // accept only text
    // first message sent by user is their name
     if (userName === false) {
        // remember user name
        userName = htmlEntities(message.utf8Data);
        // get random color and send it back to the user
        userColor = colors.shift();
        connection.sendUTF(
            JSON.stringify({ type:'color', data: userColor }));
        console.log((new Date()) + ' User is known as: ' + userName
                    + ' with ' + userColor + ' color.');
      } else { // log and broadcast the message
        // console.log((new Date()) + ' Received Message from '
        //             + userName + ': ' + message.utf8Data);
        console.log({"foo": "bar. Server see you"});
        // we want to keep history of all sent messages
        let obj = {
          time: (new Date()).getTime(),
          text: htmlEntities(message.utf8Data),
          author: userName,
          color: userColor
        };
        history.push(obj);
        history = history.slice(-100);
        // broadcast message to all connected clients
        let json = JSON.stringify({ type:'message', data: obj });
        for (let i=0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
});

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

require("./app/routes/tutorial.routes")(app);
require("./app/login/routes/auth.routes")(app);
require("./app/login/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
