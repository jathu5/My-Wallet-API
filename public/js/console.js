import { changeAccounts } from './helpers/console/changeAccounts.js';
import { consoleInputs } from './helpers/console/consoleInputs.js';
import { updateDisplay } from './helpers/console/updateDisplay.js';

const home = document.getElementById('home');
let user;

home.addEventListener('click', () => {
    window.location.href = '/home';
});

const help = () => {
    const dropdown = document.getElementById('dropdown');
    const dropdownContent = document.getElementById('dropdown-content');
    const dropdownContain = document.getElementById('all-dropdown');
    const blocks = document.querySelectorAll('.block');

    dropdown.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'block';
    });

    dropdownContain.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
    });

    const messages = ['[positive number] [account code]', '[non-zero number] [account code]', 'Click on add icon in accuont slot and follow',
        '[negative number] [account code]', 'rep', 'Click on account icon and follow',
        '[non-zero number] [deposit account code] [withdrawl account code]', '- rep', 'Click on account icon and follow'];
    for (let i = 0; i < blocks.length; ++i) {
        blocks[i].addEventListener('mouseenter', () => {
            blocks[i].textContent = messages[i];
        });

        const initialBlocks = ['Regular Deposit', 'Absolute Deposit', 'Add Account',
            'Withdrawl', 'Repeat Previous', 'Change Account',
            'Transfer', 'Cancel Previous', 'Delete Account'];
        blocks[i].addEventListener('mouseout', () => {
            blocks[i].textContent = initialBlocks[i];
        });
    }
}

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
    help();

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