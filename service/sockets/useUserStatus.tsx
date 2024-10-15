import React, { useEffect } from "react";
import { useWS } from "./WSProvider";


export const useUserStatus = (userId: string) => {
  const [isOnline, setIsOnline] = React.useState<boolean>(false);
  const [lastSeen, setLastSeen] = React.useState<string>('Nobody knows');

  const socketService = useWS();

  useEffect(() => {
    if(socketService && userId){
      socketService.emit('subscribeToUsers',[userId]);
      socketService.emit('GET_USER_STATUS',{userId});
      const handleStatusUpdate = (data: {id: string, is_online: boolean, last_seen: string}) => {
        setIsOnline(data.is_online);
        setLastSeen(data.last_seen);
      }

      socketService.on('USER_LIVE_STATUS',handleStatusUpdate);

      return () => {
        socketService.off('USER_LIVE_STATUS')
      }
    }
  },[userId, socketService])


  return {isOnline, lastSeen}
}