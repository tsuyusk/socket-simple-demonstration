import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useSocket } from './hooks/socket'

function App() {
  const nameRef = useRef();
  const messageRef = useRef();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (data) => {
      setMessages(state => [data, ...state]);
    });
  }, [socket]);

  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    if (!socket) return;

    const message = messageRef.current?.value;
    const name = nameRef.current?.value;

    if (!name || !message) {
      alert('Fill the form before submitting');
    }

    socket.emit('message', {
      text: message,
      sender: name,
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit} className="flex">
          <input
            ref={nameRef}
            type="text"
            placeholder="Insert your name here"
            className="px-3 py-2 text-black border-r-2 border-black"
          />
          <input
            ref={messageRef}
            type="text"
            placeholder="Insert your message here"
            className="px-3 py-2 text-black"
          />

          <button
            type="submit"
            className="bg-blue-400 cursor-pointer hover:bg-blue-500 transition-all px-3 py-2"
          >Send Message</button>
        </form>

        <ul>
          {messages.map(message => (
            <li>{message.sender}: {message.text}</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
