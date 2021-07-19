import { myIncludes, updateUser } from './general.js'
import { showMessage } from '../cautionTable.js';
import { updateDisplay } from './updateDisplay.js'

const addAmount = (user, inputs, amount, idx, abs) => {
    amount = Math.round(amount * 100) / 100;

    if (abs) {
        const amountDiff = amount - user.accounts[idx].amount;
        user.accounts[idx].amount = amount;
        user.balance += amountDiff;
        user.lastLog = `${inputs[0]} ${inputs[1]} abs`;
    } else {
        user.accounts[idx].amount += amount;
        user.balance += amount;
        user.lastLog = `${inputs[0]} ${inputs[1]}`;
    }

    if (!amount && !abs) {
        showMessage(false, `No changes made to your accounts`);
    } else if (updateUser(user).error) {
        showMessage(true, 'Something went wrong');
        setTimeout(() => window.location.href = '/', 2000);
    } else {
        const accountName = user.accounts[idx].name;
        let message = `$${(-amount).toFixed(2)} withdrawn from ${accountName} account`;

        if (amount >= 0) {
            if (abs) {
                message = `${accountName} account is now $${amount.toFixed(2)}`
            } else {
                message = `$${amount.toFixed(2)} deposited to ${accountName} account`;
            }
        }
        showMessage(false, message);
    }
}

const transferAmount = (user, inputs, amount, toIdx, fromIdx) => {
    amount = Math.round(amount * 100) / 100;

    if (user.accounts[fromIdx].amount < amount || user.accounts[toIdx].amount < (- amount)) {
        return showMessage(true, 'Not enough funds in account');
    }
    user.accounts[toIdx].amount += amount;
    user.accounts[fromIdx].amount -= amount;
    user.lastLog = `${inputs[0]} ${inputs[1]} ${inputs[2]}`;

    if (!amount) {
        showMessage(false, `No changes made to your accounts`);
    } else if (updateUser(user).error) {
        showMessage(true, 'Something went wrong');
        setTimeout(() => window.location.href = '/', 3000);
    } else {
        const toAccountName = user.accounts[toIdx].name;
        const fromAccountName = user.accounts[fromIdx].name;
        if (amount > 0) {
            showMessage(false, `$${amount.toFixed(2)} deposited to ${toAccountName} from ${fromAccountName}`);
        } else {
            showMessage(false, `$${amount.toFixed(2)} deposited to ${fromAccountName} from ${toAccountName}`);
        }
    }
}

function checkConsole2(inputs) {
    // call checkConsole with previous log inputs to repeat the previous log transaction
    if (inputs[0] === 'rep' || inputs[0] === '-' && inputs[1] === 'rep') {
        if (lastLog === 'N/A')
            resetConsole('Please enter a valid log before using rep');
        else {
            if (inputs[0] === '-')
                localStorage.setItem('minusRep', true);
            checkConsole(countSpaces(lastLog));
        }
    }
    // show error when first input if not a number
    else if (isNaN(inputs[0]) || inputs[0] === '')
        resetConsole('Invalid input');
    else {
        // if user inputted '- rep' then the opposite transaction of last log would occur
        if (localStorage.getItem('minusRep') === 'true') {
            inputs[0] *= -1;
            localStorage.setItem('minusRep', false);
        }

        /* check if console input is a valid transaction and if so, 
        change display and details about user */
        if (inputs[1] === undefined)
            resetConsole('Please enter a valid account');
        else if (codes.includes(inputs[1])) {
            if (inputs[2] === 'abs') {
                addAmount(Number(inputs[0]), codes.indexOf(inputs[1]), true, inputs);
            }
            else if (codes.includes(inputs[2])) {
                transferAmounts(Number(inputs[0]), codes.indexOf(inputs[1]), codes.indexOf(inputs[2]), inputs);
            }
            else if (inputs[2] === undefined) {
                addAmount(Number(inputs[0]), codes.indexOf(inputs[1]), false, inputs);
            }
            else
                resetConsole('Deposit account does not exist');
        }
        else
            resetConsole('Withdrawl account does not exist');
    }
}

const repeatLog = (user, negate) => {
    const log = user.lastLog;
    if (log === null) {
        return showMessage(true, 'No previous logs exist');
    }
    let inputs = user.lastLog.split(' ');
    if (negate) {
        inputs[0] *= -1;
    }
    checkConsole(user, inputs);
}

const checkConsole = (user, inputs) => {
    if (inputs[0] === 'rep' && inputs.length === 1) {
        repeatLog(user, false);
    } else if (inputs.length === 2 && inputs[0] === '-' && inputs[1] === 'rep') {
        repeatLog(user, true);
    } else if (isNaN(inputs[0]) || inputs[0] === '') {
        showMessage(true, 'Invalid inputs');
    } else if (inputs.length >= 4) {
        showMessage(true, `Too many inputs entered`);
    } else if (inputs.length === 1) {
        showMessage(true, 'No codes entered');
    } else {
        const toCodeIdx = myIncludes(user, 'code', inputs[1]);
        if (toCodeIdx === -1) {
            showMessage(true, `${inputs[1]} code does not exist`);
        } else if (inputs[2] === undefined) {
            addAmount(user, inputs, Number(inputs[0]), toCodeIdx, false);
        } else {
            const fromCodeIdx = myIncludes(user, 'code', inputs[2]);
            if (inputs[2] === 'abs') {
                addAmount(user, inputs, Number(inputs[0]), toCodeIdx, true);
            } else if (fromCodeIdx === -1) {
                showMessage(true, `${inputs[2]} code does not exist`);
            } else if (fromCodeIdx === toCodeIdx) {
                showMessage(true, `Both codes cannot be ${inputs[1]}`);
            } else {
                transferAmount(user, inputs, Number(inputs[0]), toCodeIdx, fromCodeIdx);
            }
        }
    }
}

export const consoleInputs = user => {
    const codeConsole = document.getElementById('console');
    codeConsole.addEventListener('keyup', e => {
        const enterKey = 13;

        if (e.keyCode === enterKey) {
            checkConsole(user, codeConsole.value.toLowerCase().split(' '));
            updateDisplay(user);
        }
    });
}