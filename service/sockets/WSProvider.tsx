import React, { createContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { tokenStorage } from "../storage";
import { SOCKET_URL } from "../config";
import { refresh_tokens } from "../api/apiInterceptors";

interface WSService {
  intializeSocket : () => void;
  emit : (event: string, data?:any) => void;
  on : (event: string, cb: (data: any) => void) => void;
  off : (event: string) => void;
  removeListener : (listenerName: string) => void;
  updateAccessToken: () => void;
}


const WSContext = createContext<WSService | undefined>(undefined);

export const WSProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
  const [socketAccessToken, setSocketAccessToken] = React.useState<string | null>(null);
  const [changedToken, setChangedToken] = React.useState<boolean>(false);
  const socket= useRef<Socket>();

  useEffect(() => {
    const token = tokenStorage.getString('accessToken') as any;
    setSocketAccessToken(token);
  },[changedToken])

  useEffect(() => {
    socket.current = io(SOCKET_URL,{
      transports: ['websocket'],
      withCredentials: true,
      extraHeaders: {
        access_token: `${socketAccessToken}` || ''
      }
    })
    if(socketAccessToken){
      socket.current.on('connect_error', (error) => {
        if(error.message === 'Authentication error'){
          console.log('connect_error',error);
          refresh_tokens();
        }
      })
    }
    return () => {
      socket.current?.disconnect()
    }
  },[socketAccessToken])

  const emit = (event: string, data?:any) => {
    socket.current?.emit(event, data);
  }

  const on = (event: string, cb: (data: any) => void) => {
    socket.current?.on(event, cb);
  }

  const off = (event: string) => {
    socket.current?.off(event);
  }

  const removeListener = (listenerName: string) => {
    socket.current?.removeListener(listenerName);
  }

  const updateAccessToken = () => {
    setChangedToken(!changedToken);
  }

  const socketService:WSService = {
    intializeSocket : () => {
      socket.current?.connect();
    },
    emit,
    on,
    off,
    removeListener,
    updateAccessToken,
  } 

  return (
    <WSContext.Provider value={socketService} >{children}</WSContext.Provider>
  )
}

export const useWS = ():WSService => {
  const context = React.useContext(WSContext);
  if (context === undefined) {
    throw new Error('useWS must be used within a WSProvider');
  }
  return context;
}