class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
        this.people = [];
    }
    
    addPerson(name){
        this.people.push({name: name});
        document.querySelector('.person__container').insertAdjacentHTML("beforeend", `
        ${name} </br>`);
        console.log(this.people.length);
        document.querySelector('#total__people').innerHTML = `${this.people.length}`;
    }

    
}
let eventName, actEv, actPer;
const state = {};


(createEvent = () =>{
    let btn = document.getElementById('event__btn');
    btn.addEventListener('click', function(){
        eventName = document.getElementById('name__input').value;
        let eventDate = document.getElementById('date__input').value.split('-').reverse().toString().replace(/,/g,"/");
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
    let btn = document.getElementById('person__btn');
    btn.addEventListener('click', function(){
        let personName = document.getElementById('person__name').value;
        state[actEv].addPerson(personName);
    })
})();
