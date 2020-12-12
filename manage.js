import { Person, Event, Expense } from "./classes.js";
import { elements } from "./elements.js";
import { insertPersonOnDom, updateExpensesOnDom, insertExpenseOnDom, insertEventOnDom, updateTotalPeopleOnDOM, insertEventButton } from "./view.js";
export const state = {};
export let actEv;

// ---- Manage Event ---- \\

export function addEvent() {
    let eventName = elements.nameInput.value;
    let eventDate = elements.dateInput.value.split('-').reverse().toString().replace(/,/g, "/");
    if (eventName && eventDate) {
        state[eventName] = new Event(eventName, eventDate);
        insertEventOnDom(eventName, eventDate);
        insertEventButton(eventName);
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

export function changeActiveEvent(selectedEvent){
    actEv = selectedEvent;
}
// ---- Manage People ---- \\

export function addPersonName() {
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
    updateTotalPeopleOnDOM();
    console.log(state);
    if (state[actEv].people.length > 1 && state[actEv].expenses) {
    };
}

export function deletePerson(e) {
    const Id = e.target.parentNode.parentNode.id;

    let confirmation = confirm(`Are you sure? All the expenses of ${Id} will also be deleted.`);

    if (confirmation) {
        //Check index of that person on the array
        const i = (state[actEv].people.findIndex(o => o.name == Id));
        //Remove expenses of that person
        let exp = state[actEv].people[i].expenses;
        state[actEv].expenses -= exp;
        //Remove from inputs list   
        let opt = document.getElementById(Id + '__opt');
        opt.parentElement.removeChild(opt);
        //Remove from Event Object 
        state[actEv].people.splice(i, 1);
        //Update expenses
        updateExpensesData();
        updateExpensesOnDom();
        //Remove from DOM
        const child = e.target.parentNode.parentNode;
        document.getElementById(Id).parentElement.removeChild(child);
        //Update the number of people
        updateTotalPeopleOnDOM();
    };

};
// ---- Manage Expenses ---- \\

export function updateExpensesData() {
    if (state[actEv].people.length > 0) {
        state[actEv].eachPayment = state[actEv].expenses / state[actEv].people.length;
        state[actEv].people.forEach(i => {
            i.payment = state[actEv].eachPayment - i.expenses;
        });
    };
}

export function addExpenseToPerson(selectedName, expAmount, description) {
    let personOnObject = state[actEv].people.find(o => o.id == selectedName);
    if (personOnObject.expenses) {
        personOnObject.expenses += expAmount;
    } else {
        personOnObject.expenses = expAmount;
    };
    if (!personOnObject.expArray) {
        personOnObject.expArray = [];
    };
    personOnObject.expArray.push(new Expense(expAmount, selectedName, description));
}

export function addExpense() {
    let selectedName = elements.peopleList.value.replace(/ /g, "_");
    let expAmount = parseFloat(elements.expenseAmount.value);
    let description = elements.expenseDescription.value
    if (expAmount) {
        addExpenseToPerson(selectedName, expAmount, description);
        insertExpenseOnDom(selectedName, expAmount, description);
        if (state[actEv].expenses) {
            state[actEv].expenses += expAmount;
        } else {
            state[actEv].expenses = expAmount;
        };
        console.log(state[actEv]);

        updateExpensesData();
        updateExpensesOnDom();
        elements.expenseAmount.value = '';
    };

}