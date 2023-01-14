const { Users } = require('../../classes/users.class');
const { io } = require('../server');
const { createMsg } = require('../utils/utils.util');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterToChat', (data, callback) =>{
        if(!data.name || !data.room){
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            });
        }

        client.join(data.room);

        users.addPerson( client.id, data.name, data.room );

        client.broadcast.to(data.room).emit('personsList', users.getPersonsPerRoom(data.room));
        client.broadcast.to(data.room).emit('createMsg', createMsg('Administrator', `${data.name} se unió al chat`));
        callback(users.getPersonsPerRoom(data.room));
    });

    client.on('createMsg', ( data, callback ) =>{
        let person = users.getPerson(client.id);
        let msg = createMsg( person.name, data.msg );
        client.broadcast.to(person.room).emit('createMsg', msg);
        callback( msg );
    });

    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson( client.id );
        client.broadcast.to(deletedPerson.room).emit('createMsg', createMsg('Administrator', `${deletedPerson.name} abandonó el chat`));
        client.broadcast.to(deletedPerson.room).emit('personsList', users.getPersonsPerRoom(deletedPerson.room));
    });

    client.on('privateMsg', ( data ) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMsg', createMsg( person.name, data.msg ));
    });

});