const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// CREAR: Servidor de sockets
const server = require('http').createServer(app); // Anexamos APP del Express
//const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server); // Para que io pueda ser leido en SOCKET.js

// Mensajes de Sockets
require('./sockets/socket');

// Path Público
const publicPath=path.resolve(__dirname,'public');
app.use(express.static(publicPath));

// Gris o verder si lo mira como si fuera un string
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto!!!', process.env.PORT);
});
