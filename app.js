import express from "express";
import {Server} from "socket.io";
import {createServer, get} from "http";
import cors from "cors"
import session from "express-session";
import { joinFunction } from "./socket.js";
import { joinHandler } from "./socketHandlers/join.js";
import { disconnect } from "cluster";
import { disconnectHandler } from "./socketHandlers/disconnect.js";

// PORT/CLIENT_ORIGIN are read from env vars so this can be deployed behind a
// host like Render/Railway (which assigns its own PORT) and pointed at a
// Netlify-hosted frontend. Local dev behavior (port 8080, localhost:3000) is
// unchanged if these env vars are not set.
let port=process.env.PORT || 8080;
const clientOrigin=process.env.CLIENT_ORIGIN || "http://localhost:3000";
const app=express();

const httpServer=createServer(app);

const io=new Server(httpServer,{
    cors:{
        origin:clientOrigin,
        methods:["GET","POST"],
        credentials:true,
    }
});



app.use(cors({
    origin:clientOrigin,
    credentials:true,
}));

export const map=new Map();

io.on("connection",(socket)=>{
    console.log(`connected to ${socket.id}`);
    
    socket.on("join",(userData)=>{joinHandler(socket,userData)});
    
    socket.on("disconnecting",()=>{disconnectHandler(socket)});
    
    socket.on("newCandidate",(candidate,id)=>{socket.to(id).emit("newCandidate",candidate,socket.id);})

    socket.on("offer",(data,id)=>{socket.to(id).emit("offer",data,socket.id);})

    socket.on("answer",(answer,id)=>{socket.to(id).emit("answer",answer,socket.id);})

})



app.get("/",(req,res)=>{
    res.send("server side")
})

httpServer.listen(port,()=>{
    console.log("port is listening");
})