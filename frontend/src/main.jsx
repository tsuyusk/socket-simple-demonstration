import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { SocketProvider } from './hooks/socket'

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
