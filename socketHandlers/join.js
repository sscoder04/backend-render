import { map} from "../app.js";
import { joinFunction } from "../socket.js";



export const joinHandler=(socket,userData)=>{
         socket.room=userData.room;
         socket.username=userData.username;
        joinFunction(socket,map,userData)
    };