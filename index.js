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
        this.people.push({ name: name });
        //Add to expenses people list
        elements.peopleList.insertAdjacentHTML("beforeend",
            `<option value="${name}">${name}</option>`);
        //Add to DOM
        elements.personCont.insertAdjacentHTML("beforeend",
            `<ul class = "person__list" id="${name}"><li>${name} </li>`);
        document.querySelector('#total__people').innerHTML = `${this.people.length}`;
    }

    updateExpenses(){
        document.querySelector('#total__expenses').innerHTML = `-${this.expenses}€`;
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
        if (actEv) {
            let personName = elements.personName.value;
            state[actEv].addPerson(personName);
            elements.personName.value = '';
        } else {
            alert('No event selected!')
        }
    })
})();

//New expense
(addExpense = () => {
    let btn = elements.expenseBtn;
    btn.addEventListener('click', function () {
        //1. Capture value on select
        let selectedName = elements.peopleList.value;
        //2. Capture expense
        let expAmount = parseFloat(elements.expenseAmount.value);
        console.log(selectedName + expAmount)
        //3. Add to object
        let perObj = state[actEv].people.find(o => o.name == selectedName);
        if(perObj.expenses){
        perObj.expenses += expAmount;
        } else {
        perObj.expenses = expAmount;
        };
        console.log(perObj)
        //4. Add to DOM
        document.getElementById(`${selectedName}`).insertAdjacentHTML('beforeend',
        `<li class="expense">-${expAmount}€</li>`);
        //5. Update total expenses
        if(state[actEv].expenses){
        state[actEv].expenses += expAmount;
        }else{
        state[actEv].expenses = expAmount;
        };
        console.log(state[actEv]);
        state[actEv].updateExpenses();
    });
})();
