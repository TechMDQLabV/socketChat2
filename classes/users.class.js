

class Users {
    constructor(){
        this.persons = [];
    }

    addPerson( id, name, room ){
        let person = { id, name, room };
        this.persons.push(person);

        return this.persons;
    }

    getPerson( id ){
        let person = this.persons.filter( person => person.id === id )[0];

        return person;
    }

    getPersons(){
        return this.persons;
    }

    getPersonsPerRoom( room ){
        let personsPerRoom = this.persons.filter( person => person.room === room);
        return personsPerRoom;
    }

    deletePerson( id ){
        let deletedPerson = this.getPerson(id);
        this.persons = this.persons.filter( person => person.id !== id);
        return deletedPerson;
    }
}

module.exports = {
    Users
}