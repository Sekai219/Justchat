const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 解析 JSON 请求体
app.use(express.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 处理同步数据请求
app.post('/sync', (req, res) => {
    const data = req.body;
    
    // 在这里处理同步数据，例如将数据存储到数据库
    console.log('Received sync data:', data);

    // 响应客户端，表示数据已经处理
    res.status(200).json({ status: 'success' });
});

// WebSocket 处理
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

server.listen(3333, () => {
    console.log('listening on *:3333');
});
