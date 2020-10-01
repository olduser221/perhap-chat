const enc = require('./encryption');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

module.exports = {

    create: async (newPort) => {
        io.on('connection', (socket) => {
            socket.on("message", (msg) => {
                console.log(`${msg.name}: ${enc.decrypt(msg.msg)}`)
            })
        });
          
        http.listen(newPort);
    },

    join: async (id) => {
        joinedSocket = require('socket.io-client')('https://' + id + '.ngrok.io');
        joinedSocket.on('message', (msg) => {
            console.log(`${msg.name}: ${enc.decrypt(msg.msg)}`)
        });
    },

    send: async (type, data) => {
        if (type === "join") {
            joinedSocket.emit("message", data)
        } else {
            io.emit("message", data)
        }
    }

}