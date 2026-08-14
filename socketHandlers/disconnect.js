import {map} from "../app.js"


export const disconnectHandler=(socket)=>{
        console.log("disconnecting",socket.id);
        let id=socket.id;
        let roomMap=map.get(socket.room);
    if(roomMap){
        if(roomMap.has(id)){
            roomMap.delete(id);
        }
        console.log("server side room",roomMap);
        socket.to(socket.room).emit("userDisconnected",socket.id);
    }
}