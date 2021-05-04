// bugs (try using cookies/session/local storage)
// not updating display (reloading) after delete
// showmessage is called after unchange is called (expect: no message when unchanging)

// additions (must include)
// add image import implementation
// add extra codes (abs, rep)

import { myIncludes, updateUser } from './general.js'
import { showMessage, hideMessage } from '../cautionTable.js';
import { updateDisplay } from './updateDisplay.js';
let changing = false;

const showOtherCell = document.getElementById('slot1');
const buttonsCell = document.getElementById('edit-slot1');
const confirm = document.getElementById('confirm');
const deleteAccount = document.getElementById('delete');

const codeConsole = document.getElementById('console');

// global mutable variable (used in multiple functions)
let slot;
let cancel;
let showCell;
let inputs;
let inputsClicked = [false, false];

const updateSlot = i => {
    slot = document.getElementById('edit-slot' + i);
    cancel = document.getElementById('slot' + i + '-cancel');
    showCell = document.getElementById('slot' + i);
    inputs = [document.getElementById(`edit-slot${i}-name`).toUpperCase(), document.getElementById(`edit-slot${i}-code`).toLowerCase(), document.getElementById(`edit-slot${i}-image`)];
}

const change = add => {
    for (let i = 0; i < inputs.length - 1; ++i) {
        inputs[i].addEventListener('keydown', e => {
            if (e.keyCode !== 13 && !inputsClicked[i]) {
                inputs[i].value = '';
                inputs[i].style.color = 'black';
                inputsClicked[i] = true;
            }
        })
        inputs[i].addEventListener('click', () => {
            if (!inputsClicked[i]) {
                inputs[i].value = '';
                inputs[i].style.color = 'black';
                inputsClicked[i] = true;
            }
        })
    }

    showCell.style.visibility = 'hidden';
    showOtherCell.style.visibility = 'hidden';
    slot.style.visibility = 'visible';
    buttonsCell.style.visibility = 'visible';
    codeConsole.style.display = 'none';
    cancel.style.display = 'block';

    if (add) {
        deleteAccount.style.display = 'none';
    } else {
        confirm.textContent = 'CHANGE ACCOUNT';
        inputs[0].value = 'CHANGE ACCOUNT NAME';
        inputs[1].value = 'CHANGE ACCOUNT CODE';
    }
}

const unchange = user => {
    if (!user) {
        console.log('what')
    }
    showCell.style.visibility = 'visible';
    showOtherCell.style.visibility = 'visible';
    slot.style.visibility = 'hidden';
    buttonsCell.style.visibility = 'hidden';
    deleteAccount.style.display = 'block';
    deleteAccount.style.margin = 'auto';
    codeConsole.style.display = 'block';
    cancel.style.display = 'none';
    inputs[0].value = 'ADD ACCOUNT NAME';
    inputs[1].value = 'ADD ACCOUNT CODE';
    inputs[0].style.color = 'rgb(129, 129, 129)';
    inputs[1].style.color = 'rgb(129, 129, 129)';
    inputsClicked = [false, false];
    changing = false;
    hideMessage();
    updateDisplay(user);
}

const buttonEvents = (user, i, add) => {
    const confirmInputs = () => {
        if (add) {
            if (inputs[0].value[0] === ' ' || inputs[1].value[0] === ' ') {
                showMessage(true, 'Name and code must not start with a space');
            } else if (inputs[0].value === '' || inputs[1].value === '' || !inputsClicked[0] || !inputsClicked[1]) {
                showMessage(true, 'Name and code must both be filled in');
            } else if (myIncludes(user, 'name', inputs[0].value) !== -1) {
                showMessage(true, 'Account name already exists');
            } else if (myIncludes(user, 'code', inputs[1].value) !== -1) {
                showMessage(true, 'Account code already exists');
            } else {
                user.accounts[i].name = inputs[0].value;
                user.accounts[i].code = inputs[1].value;
                user.accounts[i].image = 'images/check.png';

                if (updateUser(user).error) {
                    showMessage(true, 'Something went wrong');
                } else {
                    showMessage(false, 'Account has successfully been created');
                }
                unchange(user);
            }
        } else {
            const nameExists = myIncludes(user, 'name', inputs[0].value);
            const codeExists = myIncludes(user, 'code', inputs[1].value);

            let inputsValid = [false, false];
            let makeChange = false;
            if (nameExists === i || nameExists === -1) {
                inputsValid[0] = true;
            }
            if (codeExists === i || codeExists === -1) {
                inputsValid[1] = true;
            }
            if (inputs[0].value[0] === ' ' || inputs[1].value[0] === ' ') {
                showMessage(true, 'Name and code must not start with a space');
            } else if ((inputs[0].value === '' || !inputsClicked[0]) && (inputs[1].value === '' || !inputsClicked[1])) {
                showMessage(true, 'One of name or code must be filled in');
            } else if (inputs[0].value === '' || !inputsClicked[0]) {
                if (inputsValid[1]) {
                    makeChange = true;
                    user.accounts[i].code = inputs[1].value;
                } else {
                    showMessage(true, 'Account code already exists');
                }
            } else if (inputs[1].value === '' || !inputsClicked[1]) {
                if (inputsValid[0]) {
                    makeChange = true;
                    user.accounts[i].name = inputs[0].value;
                } else {
                    showMessage(true, 'Account name already exists');
                }
            } else {
                if (inputsValid[0] || inputsValid[1]) {
                    makeChange = true;
                    user.accounts[i].name = inputs[0].value;
                    user.accounts[i].code = inputs[1].value;
                } else {
                    showMessage(true, 'Account name and code already exist');
                }
            }

            if (makeChange) {
                if (updateUser(user).error) {
                    showMessage(true, 'Something went wrong');
                } else {
                    showMessage(false, 'Account has successfully been changed');
                }
                unchange(user);
            }
        }
    }

    confirm.addEventListener('click', () => {
        confirmInputs();
    });

    cancel.addEventListener('click', () => {
        unchange(user);
    });

    deleteAccount.addEventListener('click', () => {
        user.accounts[i].name = null;
        user.accounts[i].code = null;
        user.balance -= user.accounts[i].amount;
        user.accounts[i].amount = 0;
        user.accounts[i].image = 'images/add.png';

        if (updateUser(user).error) {
            showMessage(true, 'Something went wrong');
        } else {
            showMessage(false, 'Account has successfully been deleted');
        }
        unchange(user);
    });

    const enterKey = 13;
    const escKey = 27;
    for (let i = 0; i < inputs.length - 1; ++i) {
        inputs[i].addEventListener('keyup', e => {
            if (e.keyCode === enterKey) {
                confirmInputs();
            }
        });
    }
    document.addEventListener('keyup', e => {
        if (e.keyCode === escKey) {
            unchange(user);
        }
    });
}

export const changeAccounts = user => {
    const accountsCount = 8;
    let slotIcons = [];
    for (let i = 2; i < accountsCount; ++i) {
        slotIcons[i] = document.getElementById('slot' + i + '-icon');
        slotIcons[i].addEventListener('click', () => {

            if (changing) return;
            const add = !user.accounts[i].name;
            changing = true;
            updateSlot(i);
            change(add);
            buttonEvents(user, i, add);
        });
    }
}