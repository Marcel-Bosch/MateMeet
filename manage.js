import { elements } from "./elements.js";

// ---- Manage People ---- \\
export function addPerson (btn, actEv) {
    btn = elements.personBtn;
    function addPersonName () {
        let personName = elements.personName.value;
        if (actEv && personName) {
            //Check if the name is already on the list
            let perObj = state[actEv].people.find(o => o.name == personName.replace(/ /g, "_"));
            if (perObj) {
                alert('This name is already on the list');
            } else {
                addPerson(personName);
                elements.personName.value = '';
            };
        } else if (!actEv) {
            alert('No event selected!')
        } else if (!personName) {
            alert('Please insert a name')
        };
    }
    elements.personName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPersonName();
        };
    });
    btn.addEventListener('click', function () {
        addPersonName();
    })
}