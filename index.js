class Event {
    constructor(event, date) {
        this.eventName = event;
        this.date = date;
    }
}
 
const eventController = ()=>{

};

const UIController = ()=>{
     return {
         
     }  
};


let getEventInfo = (function(eventController,UIController){
    let btn = document.getElementById('event__btn');
    btn.addEventListener('click', function(){
        let eventName = document.getElementById('name__input').value;
        let eventDate = document.getElementById('date__input').value;
        let newEvent = new Event(eventName, eventDate);
        console.log(newEvent);
        const insertEvent = ()=> {
           document.querySelector('.box__middle').insertAdjacentHTML("afterbegin", `
            <div id="event__name">${eventName} ${eventDate}
            </br>Total people: 00
            </br>Total expenses: <span class=expense>00€</span>
            </div>
            `
           );
        }
        insertEvent();
        console.log(typeof(eventDate))

    });

})(eventController,UIController);
