const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const cors = require('cors');
const PORT = process.env.PORT || 3000;



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Express funcionando!');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    
    socket.on('disconnect', () => {
    console.log('a user disconnected');
    });

});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});