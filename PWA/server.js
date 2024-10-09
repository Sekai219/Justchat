const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 处理 Socket.IO 连接
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

// 启动服务器
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});