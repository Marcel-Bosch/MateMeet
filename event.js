import { insertPersonOnDom } from "./view.js";
export class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
        this.people = [];
        this.eachPayment = 0;
        this.expenses = 0;
    }

    addPerson(name) {

        let nameSpaced = name.replace(/ /g, "_");
        //Add to expenses people list
        this.people.push({ name: nameSpaced });
        insertPersonOnDom(name,nameSpaced)
        
        this.updatePeople();
        if (this.people.length > 1 && this.expenses) {
            this.updateExpenses();
        };
    }

    updatePeople() {
        document.querySelector('#total__people').innerHTML = `${this.people.length}`;
    }

    updateExpenses() {
        this.eachPayment = this.expenses / this.people.length;
        document.querySelector('#total__expenses').innerHTML = `-${this.expenses}€ (${this.eachPayment.toFixed(1)}€ each)`;
        //Calculate how much has to pay each person
        this.people.forEach(i => {
            let inner = document.querySelector(`#${i.name}__owes`);
            if (i.expenses) {
                i.payment = this.eachPayment - i.expenses;
            } else if (!i.expenses) {
                i.payment = this.eachPayment;
            };
            if (i.payment < 0) {
                inner.innerHTML = `<span class="comment"> (You have to receive ${(i.expenses - this.eachPayment).toFixed(1)}€)</span>`;
            } else if (i.payment === 0) {
                inner.innerHTML = `<span class="comment"> (You don't have to pay)</span>`;
            } else if (i.payment > 0) {
                if (i.expenses) {
                    inner.innerHTML = `<span class="comexpense"> (You have to pay ${(this.eachPayment - i.expenses).toFixed(1)}€)</span>`;
                } else {
                    inner.innerHTML = `<span class="comexpense"> (You have to pay ${this.eachPayment.toFixed(1)}€)</span>`;
                }
            }
        });

    }


}