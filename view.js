import { elements } from "./elements.js";


// ---- Event .... \\
export function insertEventOnDom(eventName, eventDate) {
    document.querySelector('#event__name').innerHTML = `<h2>${eventName.toUpperCase()}<span id="date"> (${eventDate})</span></h2>`;
    document.querySelector('#event__stats').innerHTML =
        `</br><img src="./img/cliente.svg" class="icon"> <span id="total__people">0</span>
         </br><img src="./img/efectivo.svg" class="icon"> <span class="expense" id="total__expenses">00€</span>
    `;
};

// ---- Person ---- \\
export function insertPersonOnDom(name, nameSpaced) {
    // Insert on options to add expenses
    elements.peopleList.insertAdjacentHTML("beforeend",
        `<option value="${name}" id="${nameSpaced}__opt">${name}</option>`);
    //Add to DOM
    elements.personCont.insertAdjacentHTML("beforeend",
        `<div class = "person__list" id="${nameSpaced}">${name}<span id="${nameSpaced}__owes"></span><i class="trash fas fa-trash-alt"></i></div>`);
}

// ---- Expense ---- \\

export function insertExpenseOnDom(selectedName, expAmount){
    document.getElementById(`${selectedName}`).insertAdjacentHTML('beforeend',
    `<li class="expense">-${expAmount}€</li>`);
}