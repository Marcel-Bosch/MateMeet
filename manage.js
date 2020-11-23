import { Person, Event, Expense } from "./classes.js";
import { elements } from "./elements.js";
import { insertPersonOnDom, updateExpensesOnDom, insertExpenseOnDom, insertEventOnDom } from "./view.js";
export const state = {};
export let actEv;


// ---- Manage Event ---- \\

export function processEvent() {
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
}


// ---- Manage People ---- \\

export function processPersonName() {
    let personName = elements.personName.value;
    let id = personName.replace(/ /g, "_");
    if (actEv && personName) {
        let findPerson = state[actEv].people.find(o => o.name == personName.replace(/ /g, "_"));
        if (findPerson) {
            alert('This name is already on the list');
        } else {
            addPersonOnData(personName, id);
            insertPersonOnDom(personName, id);
            updateExpensesData();
            updateExpensesOnDom();
            elements.personName.value = '';
        };
    } else if (!actEv) {
        alert('No event selected!')
    } else if (!personName) {
        alert('Please insert a name')
    };
}
function addPersonOnData(personName, id) {
    state[actEv].people.push(new Person(personName, id));
    state[actEv].updatePeople();
    console.log(state);
    if (state[actEv].people.length > 1 && state[actEv].expenses) {
    };
}


// ---- Manage Expenses ---- \\

export function updateExpensesData() {
    if(state[actEv].people.length > 0){
        state[actEv].eachPayment = state[actEv].expenses / state[actEv].people.length;
        state[actEv].people.forEach(i => {
            i.payment = state[actEv].eachPayment - i.expenses;
        });
    };
}

export function addExpenseToPerson(selectedName, expAmount) {
    let perObj = state[actEv].people.find(o => o.id == selectedName);
    if (perObj.expenses) {
        perObj.expenses += expAmount;
    } else {
        perObj.expenses = expAmount;
    };
    if (!perObj.expArray) {
        perObj.expArray = [];
    };
    perObj.expArray.push(expAmount);
}

export function processExpense() {
    let selectedName = elements.peopleList.value.replace(/ /g, "_");
    let expAmount = parseFloat(elements.expenseAmount.value);
    addExpenseToPerson(selectedName, expAmount);
    insertExpenseOnDom(selectedName, expAmount);

    if (state[actEv].expenses) {
        state[actEv].expenses += expAmount;
    } else {
        state[actEv].expenses = expAmount;
    };
    console.log(state[actEv]);

    updateExpensesData();
    updateExpensesOnDom();
    elements.expenseAmount.value = '';
}