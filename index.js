import { elements } from "./elements.js";
import {
    addPersonName,
    addExpense,
    addEvent,
    deletePerson,
    changeActiveEvent,
    saveAll,
} from "./manage.js";
import { foldSidebar, renderEvent, updateExpensesOnDom, updateTotalPeopleOnDOM } from "./view.js";

//Menu Btn
elements.menuBtn.addEventListener('click', () => {
    foldSidebar();
});

//New event
elements.eventBtn.addEventListener('click', function () {
    addEvent();
});

//New expense
elements.expenseBtn.addEventListener('click', () => {
    addExpense();
});
elements.expenseAmount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});

//New person 
elements.personBtn.addEventListener('click', function () {
    addPersonName();
});
elements.personName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPersonName();
    };
});

//Events click
document.addEventListener('click', e => {
    if (e.target.matches('.trash')) {
        deletePerson(e)
    };
    if (e.target.matches('.event__selector')) {
        changeActiveEvent(e.target.innerHTML);
        renderEvent();
        updateExpensesOnDom();
        updateTotalPeopleOnDOM();
        saveAll();  
    }
});

