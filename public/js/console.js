import { changeAccounts } from './helpers/console/changeAccounts.js';
import { consoleInputs } from './helpers/console/consoleInputs.js';
import { updateDisplay } from './helpers/console/updateDisplay.js';

const home = document.getElementById('home');

home.addEventListener('click', () => {
    window.location.href = '/home';
});

const userSigned = user => {
    if (!JSON.parse(sessionStorage.getItem('signed'))) {
        clearToken();
    }
    
    sessionStorage.setItem('addStatus', undefined);
    consoleInputs(user);
    changeAccounts(user);
    updateDisplay(user);
}

fetch('user')
    .then(res => res.json()).then(user => {
        if (!user.error) {
            userSigned(user);
        }
    }).catch(err => {
        console.log(err);
       // window.location.href = '/home'
    });