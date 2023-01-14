const { Socket } = require("engine.io");
const express = require("express");
const app = express();
const path = require('path');


const http = require('http').createServer(app)

//setting path 
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

http.listen(PORT,()=>{
    console.log(`Server is running on port no : ${PORT}`);
} )

//socket.io

const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log('socketio is connected !');
    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message', msg);
    })
} )


