import 'dotenv/config';
import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import connectDB from './src/db/db.js';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { setupSocketIO } from './src/sockets/index.js';


connectDB();

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello from server');
});
app.use('/api/user', userRouter);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});
// console.log(io)

setupSocketIO(io)

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });

    socket.on('chat_message', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('chat_message', message); // Broadcast to all connected clients
    });
});

server.listen(port, () => {
  console.log(`Successful connection on ${port}`);
});

export default app;
