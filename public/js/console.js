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

    const messages = ['Deposit: <positive number> <account code>\nWithdrawal: <negative number> <account code>\nTransfer: <non-zero number> <deposit account code> <withdrawal account code>',
        'Absolute Deposit: abs <number> <account code>\nRepeat Previous Log: rep\nUndo Previous Log: - rep',
        'Add, change or delete account by clicking on its icon and fill in inputs'];
    dropdownContain.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
        blocks[0].textContent = 'Regular Transfers';
        blocks[1].textContent = 'Helpful Codes';
        blocks[2].textContent = 'Modify Accounts';
    });

    for (let i in blocks) {
        blocks[i].addEventListener('mouseover', () => {
            blocks[i].textContent = messages[i];
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
        //   window.location.href = '/home'
    });