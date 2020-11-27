const {io} = require('../index'); // Importar el Exportanción de INDEX

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    // Igual que el EMIT: mensaje
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        
        // Se lo envio a TODOS los clientes
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    })
});