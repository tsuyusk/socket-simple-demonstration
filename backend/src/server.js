const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const socket = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = socket(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;

  return next();
})

io.on('connection', socket => {
  socket.on('message', (messageData) => {
    io.emit('message', messageData)
  });
});

const PORT = 3333;
httpServer.listen(PORT, () => {
  console.log(`server listening on port *:${PORT}`);
})
