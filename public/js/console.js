// import from other local files
import { changeAccounts } from './helpers/console/changeAccounts.js';
import { consoleInputs } from './helpers/console/consoleInputs.js';
import { other } from './helpers/console/minorDetails.js';
import { updateDisplay } from './helpers/console/updateDisplay.js';

// define global variables
const home = document.getElementById('home');
let user;

// redirect page to home
home.addEventListener('click', () => {
    window.location.href = '/home';
});

// execute when user is verified and signed in
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
    other();

    let executed = false;
    if (!executed) {
        updateDisplay(user);
        executed = true;
    }
}

// check if user signed in
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