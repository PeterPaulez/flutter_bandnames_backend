const {io} = require('../index'); // Importar el Exportanción de INDEX
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Héroes'));
bands.addBand(new Band('Depeche Mode'));
bands.addBand(new Band('Beatles'));
console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    // Igual que el EMIT: mensaje
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        
        // Se lo envio a TODOS los clientes
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });


    // Igual que el EMIT: mensaje
    client.on('sent-mensaje', (payload) => {
        console.log('mensaje', payload);
        
        // Se lo envio a TODOS los clientes
        //io.emit('sent-mensaje', payload);

        // Se lo envio a todo el mundo menos al que lo manda
        client.broadcast.emit('sent-mensaje', payload);
    });


    // Igual que el EMIT: mensaje
    client.on('vote-band', (payload) => {
        console.log('Vote:', payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    // Igual que el EMIT: mensaje
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        console.log('Add:', newBand);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    // Igual que el EMIT: mensaje
    client.on('del-band', (payload) => {
        console.log('Delete:', payload);
        bands.delBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});