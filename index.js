
import { elements } from "./elements.js";
import {
    addPersonName,
    addExpense,
    addEvent,
    deletePerson,
    changeActiveEvent,
    saveAll,
    findPersonNameById
} from "./manage.js";
import { renderEvent, updateExpensesOnDom, updateTotalPeopleOnDOM,closePersonMenu, openPersonMenu,closeEventMenu, openEventMenu } from "./view.js";


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
elements.expenseDescription.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});

//New person 

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
    if(e.target.matches('.person__menu__open__btn')){
        openPersonMenu();
        const id = e.target.parentNode.parentNode.id;
        document.getElementById('people__list').value = findPersonNameById(id);
    }
    if(e.target.matches('.event__menu__open__btn')){
        openEventMenu();
    }
});

//Close click
elements.personMenuCloseBtn.addEventListener('click', function(){
    closePersonMenu();
});
elements.eventMenuCloseBtn.addEventListener('click', function(){
    closeEventMenu();
});
