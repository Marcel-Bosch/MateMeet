import { elements } from "./elements.js";
import { state, actEv } from "./manage.js";


// ---- Event .... \\
export function insertEventOnDom(eventName, eventDate) {
    //Delete previous event and people
    document.querySelector('#event__name').innerHTML = "";
    document.querySelector('.person__container').innerHTML = "";
    //Insert on dom
    document.querySelector('#event__name').innerHTML = `<h2>${eventName.toUpperCase()}<span id="date"> (${eventDate})</span></h2>`;
    document.querySelector('#event__stats').innerHTML =
        `</br><img src="./img/cliente.svg" class="icon"> <span id="total__people">0</span>
         </br><img src="./img/efectivo.svg" class="icon"> <span class="expense" id="total__expenses">00€</span>
    `;
};
export function insertEventButton(eventName) {
    document.querySelector("#events__list").insertAdjacentHTML("afterbegin",
        `<button class="event__selector">${eventName}</button>`);
}

export function renderEvent() {
    //Render The selected event
    insertEventOnDom(state[actEv].eventName, state[actEv].date);
    //Render people
    state[actEv].people.forEach(person => {
        insertPersonOnDom(person.name, person.id);
        person.expArray.forEach(expense =>{
            insertExpenseOnDom(expense.person, expense.amount, expense.description);
        })
    });
}



export function updateTotalPeopleOnDOM() {
    document.querySelector('#total__people').innerHTML = `${state[actEv].people.length}`;
}

// ---- Expenses ---- \\
export function insertExpenseOnDom(selectedName, expAmount, description) {
    document.getElementById(`${selectedName}`).insertAdjacentHTML('beforeend',
        `<li class="expense">-${expAmount}€ <span class="description">${description}</span></li>`);
}

export function updateExpensesOnDom() {
    document.querySelector('#total__expenses').innerHTML = `-${state[actEv].expenses}€ (${state[actEv].eachPayment.toFixed(1)}€ each)`;

    state[actEv].people.forEach(i => {
        let inner = document.querySelector(`#${i.id}__owes`);
        if (i.payment < 0) {
            inner.innerHTML = `<span class="comment"><i class="fas fa-hand-holding-usd"></i> ${(i.expenses - state[actEv].eachPayment).toFixed(1)}€</span>`;
        } else if (i.payment == 0) {
            inner.innerHTML = `<span class="comment"><i class="fas fa-thumbs-up"></i></span>`;
        } else if (i.payment > 0) {
            inner.innerHTML = `<span class="comexpense"><i class="fas fa-tired"></i> -${(i.payment).toFixed(1)}€</span>`;
        }
    });
}

// ---- Person ---- \\
export function insertPersonOnDom(name, id) {
    // Insert on options to add expenses
    elements.peopleList.insertAdjacentHTML("beforeend",
        `<option value="${name}" id="${id}__opt">${name}</option>`);
    //Add to DOM
    elements.personCont.insertAdjacentHTML("beforeend",
        `<div class = "person__list" id="${id}">
                <div class = "person__header">
                    ${name}
                    <span id="${id}__owes"></span>
                    <i class="trash fas fa-trash-alt"></i>
                    <i class="fas fa-chevron-down"></i>
                </div>
        </div>`);
}

// ---- Fold Sidebar ---- \\
export function foldSidebar() {
    elements.boxLeft.style.width = (elements.boxLeft.style.width === '2%' ? '20%' : '2%');
    elements.boxMiddle.style.marginLeft = (elements.boxMiddle.style.marginLeft === '0%' ? '20%' : '0%');
    elements.boxMiddle.style.width = (elements.boxMiddle.style.width == '80%' ? '60%' : '80%');
    elements.buttonBox.style.opacity = (elements.buttonBox.style.opacity == '0' ? '1' : '0');
}
