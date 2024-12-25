export const setupSocketIO = (io) => {
    console.log('Setting up socket.io...');
    console.log(io); // Log the `io` object directly

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`); // Log socket connection

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        socket.on('chat_message', (message) => {
            console.log(`Received message: ${message}`);
            io.emit('chat_message', message); // Broadcast to all connected clients
        });
    });
};
