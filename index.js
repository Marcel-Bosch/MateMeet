
import { elements } from "./elements.js";
import { updateExpensesOnDom } from "./view.js";
import { processPersonName, updateExpensesData, processExpense, processEvent, actEv, state } from "./manage.js";

createEvent();
deleteperson();
addExpense();
addPerson();


//New event
function createEvent() {
    elements.eventBtn.addEventListener('click', function () {
        processEvent();
    });
};


//New expense
function addExpense() {
    elements.expenseBtn.addEventListener('click', () => {
        processExpense();
    }
    );
    elements.expenseAmount.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processExpense();
        }
    });
};


//New person 
function addPerson() {
    elements.personName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processPersonName();
        };
    });
    elements.personBtn.addEventListener('click', function () {
        processPersonName();
    })
}


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
                //Remove from Event Object 
                state[actEv].people.splice(i, 1);
                //Update expenses
                updateExpensesData();
                updateExpensesOnDom();
                //Remove from DOM
                const child = e.target.parentNode;
                document.getElementById(Id).parentElement.removeChild(child);
                //Update the number of people
                state[actEv].updatePeople();
            }

        }
    })

};