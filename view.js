import { elements } from "./elements.js";
import { state, actEv } from "./manage.js";


// ---- Event .... \\
export function insertEventOnDom(eventName, eventDate) {
    document.querySelector('#event__name').innerHTML = `<h2>${eventName.toUpperCase()}<span id="date"> (${eventDate})</span></h2>`;
    document.querySelector('#event__stats').innerHTML =
        `</br><img src="./img/cliente.svg" class="icon"> <span id="total__people">0</span>
         </br><img src="./img/efectivo.svg" class="icon"> <span class="expense" id="total__expenses">00€</span>
    `;
};


// ---- Person ---- \\
export function insertPersonOnDom(name, id) {
    // Insert on options to add expenses
    elements.peopleList.insertAdjacentHTML("beforeend",
        `<option value="${name}" id="${id}__opt">${name}</option>`);
    //Add to DOM
    elements.personCont.insertAdjacentHTML("beforeend",
        `<div class = "person__list" id="${id}">${name}<span id="${id}__owes"></span><i class="trash fas fa-trash-alt"></i></div>`);
}


// ---- Expenses ---- \\
export function insertExpenseOnDom(selectedName, expAmount) {
    document.getElementById(`${selectedName}`).insertAdjacentHTML('beforeend',
        `<li class="expense">-${expAmount}€</li>`);
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