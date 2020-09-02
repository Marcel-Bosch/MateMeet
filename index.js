const elements = {
    personCont: document.querySelector('.person__container'),
    totalPeople: document.querySelector('#total__people'),
    eventBtn: document.getElementById('event__btn'),
    nameInput: document.getElementById('name__input'),
    dateInput: document.getElementById('date__input'),
    personBtn: document.getElementById('person__btn'),
    personName: document.getElementById('person__name')
}

class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
        this.people = [];
    }
    
    addPerson(name){
        this.people.push({name: name});
        elements.personCont.insertAdjacentHTML("beforeend", `
        ${name} </br>`);
        console.log(this.people.length);
        elements.totalPeople.innerHTML = `${this.people.length}`;
    }

    
}
let actEv, actPer;
const state = {};


(createEvent = () =>{
    let btn = elements.eventBtn;
    btn.addEventListener('click', function(){
        let eventName = elements.nameInput.value;
        let eventDate = elements.dateInput.value.split('-').reverse().toString().replace(/,/g,"/");
        state[eventName] = new Event(eventName, eventDate);
        (insertEvent = ()=> {
          document.querySelector('#event__name').innerHTML= `${eventName} (${eventDate})
          </br>Total people: <span id="total__people">0</span>
          </br>Total expenses: <span class="expense">00€</span>
          `;
        })();
        state.actualEvent= eventName;
        actEv = state.actualEvent.toString();
        console.log(state);
    });
})();

(addPerson = () => {
    let btn = elements.personBtn;
    btn.addEventListener('click', function(){
        let personName = elements.personName.value;

        state[actEv].addPerson(personName);
    })
})();
