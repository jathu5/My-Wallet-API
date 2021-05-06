import { changeAccounts } from './helpers/console/changeAccounts.js';
import { consoleInputs } from './helpers/console/consoleInputs.js';
import { updateDisplay } from './helpers/console/updateDisplay.js';

const home = document.getElementById('home');
let user;

home.addEventListener('click', () => {
    window.location.href = '/home';
});

const userSigned = user => {
    if (!JSON.parse(sessionStorage.getItem('signed'))) {
        fetch('user/clear/authToken', {
            method: 'POST',
            credentials: 'same-origin'
        }).then(res => { });
    }

    sessionStorage.setItem('addStatus', undefined);
    consoleInputs(user);
    changeAccounts(user);

    let executed = false;
    if (!executed) {
        updateDisplay(user);
        executed = true;
    }
}

fetch('user')
    .then(res => res.json()).then(retval => {
        if (!retval.error) {
            user = retval;
            userSigned(user);
        }
    }).catch(err => {
        console.log(err);
        window.location.href = '/home'
    });