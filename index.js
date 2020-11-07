
import { Event } from "./event.js";
import { elements } from "./elements.js";
import { insertEventOnDom, insertExpenseOnDom } from "./view.js";
import { addPerson } from "./manage.js";
let actEv, btn;
const state = {};



createEvent();
deleteperson();
addExpense();
addPerson(btn, actEv);

//New event
function createEvent() {
    btn = elements.eventBtn;
    btn.addEventListener('click', function () {
        let eventName = elements.nameInput.value;
        let eventDate = elements.dateInput.value.split('-').reverse().toString().replace(/,/g, "/");
        if (eventName && eventDate) {
            state[eventName] = new Event(eventName, eventDate);
            insertEventOnDom(eventName, eventDate);
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
};


//New expense
function addExpense() {
    btn = elements.expenseBtn;
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
        if (!perObj.expArray) {
            perObj.expArray = [];
        };
        perObj.expArray.push(expAmount);

        insertExpenseOnDom(selectedName, expAmount);
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
};

//Delete person
function deleteperson() {

    document.addEventListener('click', e => {
        if (e.target.matches('.trash')) {
            const Id = e.target.parentNode.id;
            let confirmation = confirm(`Are you sure you want to delete ${Id}?`);

            if (confirmation) {
                //Check index of that person on the array
                const i = (state[actEv].people.findIndex(o => o.name == Id));
                //Remove expenses of that person
                let exp = state[actEv].people[i].expenses;
                state[actEv].expenses -= exp;
                //Remove from inputs list   
                let opt = document.getElementById(Id + '__opt');
                opt.parentElement.removeChild(opt);
                //Update expenses
                if (state[actEv].people[i].expenses != 0) {
                    state[actEv].updateExpenses();
                }
                //Remove from Event Object 
                state[actEv].people.splice(i, 1);
                //Remove from DOM
                const child = e.target.parentNode;
                document.getElementById(Id).parentElement.removeChild(child);
                //Update the number of people
                state[actEv].updatePeople();
            }

        }
    })

};