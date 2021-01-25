
import { elements } from "./elements.js";
import {
    addPersonName,
    addExpense,
    addEvent,
    deletePerson,
    changeActiveEvent,
    saveAll,
} from "./manage.js";
import { foldSidebar, renderEvent, updateExpensesOnDom, updateTotalPeopleOnDOM,closePersonMenu, openPersonMenu } from "./view.js";

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
    if(e.target.matches('.person__menu__open__btn')){
        openPersonMenu();
        document.getElementById('people__list').value = e.target.parentNode.parentNode.id;
    }
});

//Close click
elements.personMenuCloseBtn.addEventListener('click', function(){
    closePersonMenu();
})
