//DOM elements
const elements = {
    personCont: document.querySelector('.person__container'),
    eventBtn: document.getElementById('event__btn'),
    nameInput: document.getElementById('name__input'),
    dateInput: document.getElementById('date__input'),
    personBtn: document.getElementById('person__btn'),
    personName: document.getElementById('person__name'),
    peopleList: document.getElementById('people__list'),
    expenseBtn: document.getElementById('expense__btn'),
    expenseAmount: document.getElementById('expense__amount'),
};

//Event class
class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
        this.people = [];
    }

    addPerson(name) {
        //Add to expenses people list
        let nameSpaced = name.replace(/ /g, "_");
        this.people.push({ name: nameSpaced });
        elements.peopleList.insertAdjacentHTML("beforeend",
        `<option value="${name}">${name}</option>`);
        //Add to DOM
        elements.personCont.insertAdjacentHTML("beforeend",
        `</br><ul class = "person__list" id="${nameSpaced}"><li>${name}<span id="${nameSpaced}__owes"></span></ul>`);
        document.querySelector('#total__people').innerHTML = `${this.people.length}`;
        if (this.people.length > 1 && this.expenses) {
            this.updateExpenses();
        };
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
                //Doesn't have to pay
                inner.innerHTML = `<span class="comment"> (You have to receive ${(i.expenses-this.eachPayment).toFixed(1)}€)</span>`;
            } else if (i.payment === 0) {
                inner.innerHTML = `<span class="comment"> (You don't have to pay)</span>`;
            } else if (i.payment > 0) {
                if(i.expenses){
                inner.innerHTML = `<span class="comexpense"> (You have to pay ${(this.eachPayment-i.expenses).toFixed(1)}€)</span>`;
                }else{
                inner.innerHTML = `<span class="comexpense"> (You have to pay ${this.eachPayment.toFixed(1)}€)</span>`;
                }
            }
        });

    }


};

let actEv;
const state = {};

//New event
(createEvent = () => {
    let btn = elements.eventBtn;
    btn.addEventListener('click', function () {
        let eventName = elements.nameInput.value;
        let eventDate = elements.dateInput.value.split('-').reverse().toString().replace(/,/g, "/");
        if (eventName && eventDate) {
            state[eventName] = new Event(eventName, eventDate);
            (insertEvent = () => {
                document.querySelector('#event__name').innerHTML = `${eventName} (${eventDate})
          </br>Total people: <span id="total__people">0</span>
          </br>Total expenses: <span class="expense" id="total__expenses">00€</span>
          `;
            })();
            state.actualEvent = eventName;
            actEv = state.actualEvent.toString();
            elements.nameInput.value = '';
            elements.dateInput.value = '';
            console.log(state);
        } else if (eventDate && !eventName) {
            alert('Missing the name!');
        } else if (eventName && !eventDate) {
            alert('Missing the date!');
        }
    });
})();

//New person
(addPerson = () => {
    let btn = elements.personBtn;
    btn.addEventListener('click', function () {
        let personName = elements.personName.value;
        if (actEv && personName) {
            state[actEv].addPerson(personName);
            elements.personName.value = '';
        } else if (!actEv) {
            alert('No event selected!')
        } else if (!personName) {
            alert('Please insert a name')
        };
    })
})();

//New expense
(addExpense = () => {
    let btn = elements.expenseBtn;
    btn.addEventListener('click', function () {
        //1. Capture value on select
        let selectedName = elements.peopleList.value.replace(/ /g, "_");
        //2. Capture expense
        let expAmount = parseFloat(elements.expenseAmount.value);
        //3. Add to object
        let perObj = state[actEv].people.find(o => o.name == selectedName);
        if (perObj.expenses) {
            perObj.expenses += expAmount;
        } else {
            perObj.expenses = expAmount;
        };
        if(!perObj.expArray){
        perObj.expArray = [];
        };
        perObj.expArray.push(expAmount);
        //4. Add to DOM
        document.getElementById(`${selectedName}`).insertAdjacentHTML('beforeend',
            `<li class="expense">-${expAmount}€</li>`);
        //5. Update total expenses
        if (state[actEv].expenses) {
            state[actEv].expenses += expAmount;
        } else {
            state[actEv].expenses = expAmount;
        };
        console.log(state[actEv]);
        //6. Update each payment
        state[actEv].updateExpenses();
    });
})();
