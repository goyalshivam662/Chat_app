const express = require("express");
const { Server } = require("socket.io"); 

const app = express();
// server is created


const http = require("http");
const server = http.createServer(app);

const io =  new Server(server);

let userList = [];  //online list


 // app.use(express.json());
 app.use(express.static("public"));
// this line make  (public-name) folder static for application

io.on("connection",function(socket){
    
    socket.on("userConnected",function(username){

        let userObject = { id : socket.id, username : username };
        userList.push(userObject);
    

        // for self
       socket.emit("online-list",userList) ;


        // broadcast a message to all other client except sender
        socket.broadcast.emit("join",userObject);

       
    })


    socket.on("chat",function(chatobj){

        socket.broadcast.emit("chatleft",chatobj);

    })

    socket.on("disconnect",function(){
        let leftuserobj ;
        let remainingUser = userList.filter(function(userObj){
            if(userObj.id == socket.id){
                leftuserobj = userObj;
                return false;
            }
            return true;
        }) //filter
       userList = remainingUser;
       socket.broadcast.emit("leave",leftuserobj);

    })



});


let port = process.env.PORT || 3000 ;
server.listen(port,function(){

    console.log("server is started heloloololo!!!!!!!");
})



