const express = require("express");
const riot = require("./riot.js")
const app = express()
const socket = require("socket.io")
const port = "8000"

const server = app.listen(port, ()=>{
  console.log("listening to port "+ port )
})

app.use(express.static("public")) // will contain the userinterface
// Socket setup
var io = socket(server);
 
io.on("connection", (socket)=>{
  
  socket.on("sumTell",(data)=>{
    io.in(data.gameId).emit("sumUsed",data)
  })

  socket.on("startMatch",(data)=>{
    console.log(data.summonerName)
    riot.getMatch(data.summonerName).then((match) => {
      console.log(match)
      socket.emit("match", match);
      socket.join(match.gameId);
    })
  })
  
})

