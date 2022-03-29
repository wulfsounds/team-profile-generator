const Employee = require('./lib/employee');

class Manager extends Employee {
    constructor (name, id, email, office) {
        super (name, id, email);
        this.office = office
    }

    getRole() {
        return "Intern"
    }
    
    getSchool () {
        return this.office;
    }
}

module.exports = Manager;