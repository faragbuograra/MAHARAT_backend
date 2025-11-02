import 'dotenv/config'
import { app } from './app';
import { SERVER_PORT } from './config';
import { DOMAIN } from './config';
import { Model } from 'objection';
import { knex } from '../knexfile';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import Message from './Modules/Messages/messages.model';

const start = async () => {
    Model.knex(knex);
    const httpServer = createServer(app);
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*', // Adjust as needed for production
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    // Simple in-memory user socket map (for demo)
    const userSockets = new Map();

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
        // Expect client to emit 'join' with their userId
        socket.on('join', ({ userId }) => {
            console.log('Join event received:', userId);
            if (userId) {
                userSockets.set(userId, socket.id);
                socket.data.userId = userId;
            }
        });

        // Debug: log all events
   

        // Handle sending messages
        socket.on('message', async ({ receiver_id, content, sender_id }) => {
            console.log('Message received:', { receiver_id, content, sender_id });
            const sender = sender_id || socket.data.userId;
            if (!sender || !receiver_id || !content) return;
            // Save to DB
         
            try {
                await Message.query().insert({
                    sender_id: sender,
                    receiver_id: receiver_id,
                    content,
                    read_status: false
                });
            } catch (err) {
                console.error('Failed to save message to DB:', err);
            }
            // Emit to recipient if online
            const toSocketId = userSockets.get(receiver_id);
            const msg = { sender_id: sender, receiver_id, content, isMine: true, createdAt: new Date() };
            if (toSocketId) {
                io.to(toSocketId).emit('message', msg);
            }
            // Echo to sender as 'isMine: true'
            socket.emit('message', { ...msg, isMine: true });
        });

        socket.on('disconnect', () => {
            if (socket.data.userId) {
                userSockets.delete(socket.data.userId);
            }
            console.log('Socket disconnected:', socket.id);
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });
    });

    httpServer.listen(SERVER_PORT, () =>
        console.log(`Server listening at ${DOMAIN} (with Socket.IO)`)
    );
};

// Running the App
start().catch((err) => console.log(err));
