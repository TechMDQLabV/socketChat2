var socket = io();

var params = new URLSearchParams( window.location.search );
if( !params.has('name') || !params.has('room') ){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterToChat', user, function( resp ){
        console.log('Usuarios conectados', resp)
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMsg', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMsg', function(msg) {

    console.log('Servidor:', msg);

});

socket.on('personsList', function(persons){
    console.log('Servidor', persons);
})

socket.on('privateMsg', function(msg){
    console.log('Mensaje privado: ', msg);
})