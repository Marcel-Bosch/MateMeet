import { Person } from "./classes.js";
import { elements } from "./elements.js";
import {state, actEv} from "./index.js";
import { insertPersonOnDom } from "./view.js";


// ---- Manage People ---- \\
export function processPersonName () {
    let personName = elements.personName.value;
    let nameSpaced = personName.replace(/ /g, "_");
    if (actEv && personName) {
        //Check if the name is already on the list
        let findPerson = state[actEv].people.find(o => o.name == personName.replace(/ /g, "_"));
        if (findPerson) {
            alert('This name is already on the list');
        } else {
            addPersonOnData(personName);
            insertPersonOnDom(personName,nameSpaced);
            elements.personName.value = '';
        };
    } else if (!actEv) {
        alert('No event selected!')
    } else if (!personName) {
        alert('Please insert a name')
    };
}
function addPersonOnData(personName) {

    //Add to data list
    state[actEv].people.push(new Person(personName));
    state[actEv].updatePeople();
    console.log(state);
    if (state[actEv].people.length > 1 && state[actEv].expenses) {
        state[actEv].updateExpenses();
    };
}