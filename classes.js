export class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
        this.people = [];
        this.eachPayment = 0;
        this.expenses = 0;
    }

    updatePeople() {
        document.querySelector('#total__people').innerHTML = `${this.people.length}`;
    }

}
export class Person {
    constructor(name, id) {
        this.name = name;
        this.expArray = [];
        this.expenses = 0;
        this.payment = 0;
        this.id = id;
    }
}