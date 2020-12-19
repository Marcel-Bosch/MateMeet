import { Person, Event, Expense } from "./classes.js";
import { elements } from "./elements.js";
import { insertPersonOnDom, updateExpensesOnDom, insertExpenseOnDom, insertEventOnDom, updateTotalPeopleOnDOM, insertEventButton, renderEvent } from "./view.js";
export let state = {
    eventList: [],
    actualEvent: ""
};
export let actEv;

let storedData = localStorage.getItem('Events');
if(storedData){
    state = JSON.parse(storedData);
    actEv = state.actualEvent;
    changeActiveEvent(actEv);
    renderEvent();
    updateExpensesOnDom();
    updateTotalPeopleOnDOM();
    state.eventList.forEach((eventName)=>{
        insertEventButton(eventName);
    });
};

export function saveAll(){
    localStorage.setItem('Events', JSON.stringify(state));
}

// ---- Manage Event ---- \\

export function addEvent() {
    let eventName = elements.nameInput.value;
    let eventDate = elements.dateInput.value.split('-').reverse().toString().replace(/,/g, "/");
    let eventNameIsOnTheList = state.eventList.find(e => e == eventName);
    if(eventNameIsOnTheList){
        let howMany = findHowManyOnArray(state.eventList, eventName);
        eventName = eventName + ` (${howMany})`;
    };
    if (eventName && eventDate) {
        state[eventName] = new Event(eventName, eventDate);
        insertEventOnDom(eventName, eventDate);
        insertEventButton(eventName);
        state.actualEvent = eventName;
        state.eventList.push(eventName);
        actEv = state.actualEvent;
        elements.nameInput.value = '';
        elements.dateInput.value = '';
        console.log(state);
    } else if (eventDate && !eventName) {
        alert('Missing the name!');
    } else if (eventName && !eventDate) {
        alert('Missing the date!');
    }; 
    saveAll();
}

function findHowManyOnArray(array, string) {
    let count = 0;
    for(let i=0; i<array.length; i++){
        if(array[i] == string || array[i].includes(`${string} (`)){
            count++;
        }
    }
    return count;
}

export function changeActiveEvent(selectedEvent){
    actEv = selectedEvent;
    state.actualEvent = selectedEvent;
}
// ---- Manage People ---- \\

export function addPersonName() {
    let personName = elements.personName.value;
    let id = personName.replace(/ /g, "_");
    if (actEv && personName) {
        let personIsOnTheList = state[actEv].people.find(person => person.name == personName.replace(/ /g, "_"));
        if (personIsOnTheList) {
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
    saveAll();
}
function addPersonOnData(personName, id) {
    state[actEv].people.push(new Person(personName, id));
    updateTotalPeopleOnDOM();
    console.log(state);
    if (state[actEv].people.length > 1 && state[actEv].expenses) {
    };
    saveAll();
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
    saveAll();

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
    saveAll();
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
    saveAll();

}