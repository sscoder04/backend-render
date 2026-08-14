
export const joinFunction= (socket,map,userData)=>{
        let room=userData.room;
        socket.join(room);
       
        if(map.has(room)){
            const roomMap = map.get(room); 
            roomMap.set(socket.id,userData.username);
        }else{
           let newRoomMap=new Map();
           newRoomMap.set(socket.id,userData.username);
           map.set(room,newRoomMap); 
        }
        //changing to array because socket only emits strings and map can be converted properly
        let data=Array.from(map.get(room));
        socket.emit("userInfo",data);
        socket.to(room).emit("newUser",socket.id,userData.username);
}