import React, { useContext, createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const initialState = {
  socket: null,
}

const SocketContext = createContext(initialState);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(
      io(`http://localhost:3333`)
    );

    return () => {
      setSocket(null);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const data = useContext(SocketContext);

  if (!data) {
    throw new Error('Using `useSocket` outside `SocketProvider` isn\'t allowed');
  }

  return data;
}