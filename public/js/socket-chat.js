var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterToChat', user, function(resp) {
        //console.log('Usuarios conectados', resp);
        renderUsers(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMsg', function(msg) {
    //console.log('Servidor:', msg);
    renderMsgs(msg, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('personList', function(persons) {
    renderUsers(persons);
});

// Mensajes privados
socket.on('privateMsg', function(msg) {

    console.log('Mensaje Privado:', msg);

});