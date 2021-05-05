import { myIncludes, updateUser } from './general.js'
import { showMessage } from '../cautionTable.js';
import { updateDisplay } from './updateDisplay.js'

const addAmount = (user, inputs, amount, idx) => {
    amount = Math.round(amount * 100) / 100;
    user.accounts[idx].amount += amount;
    user.balance += amount;
    user.lastLog = `${inputs[0]} ${inputs[1]}`;

    if (updateUser(user).error) {
        showMessage(true, 'Something went wrong');
        setTimeout(() => window.location.href = '/home', 2000);
    } else {
        const accountName = user.accounts[idx].name;
        if (amount > 0) {
            showMessage(false, `$${amount.toFixed(2)} deposited to ${accountName} account`);
        } else {
            showMessage(false, `$${(-amount).toFixed(2)} withdrawn from ${accountName} account`);
        }
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

    if (updateUser(user).error) {
        showMessage(true, 'Something went wrong');
        setTimeout(() => window.location.href = '/home', 3000);
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

const checkConsole = (user, inputs) => {
    if (isNaN(inputs[0]) || inputs[0] === '') {
        showMessage(true, 'Invalid inputs');
    } else if (!Number(inputs[0])) {
        showMessage(false, `No changes made to your accounts`);
    } else if (inputs.length >= 4) {
        showMessage(true, `Too many codes entered`);
    } else if (inputs.length === 1) {
        showMessage(true, 'No codes entered code');
    } else {
        const toCodeIdx = myIncludes(user, 'code', inputs[1]);
        if (toCodeIdx === -1) {
            showMessage(true, `${inputs[1]} code does not exist`);
        } else if (inputs[2] === undefined) {
            addAmount(user, inputs, Number(inputs[0]), toCodeIdx);
        } else {
            const fromCodeIdx = myIncludes(user, 'code', inputs[2]);
            if (fromCodeIdx === -1) {
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
            checkConsole(user, (codeConsole.value).split(' '));
            updateDisplay(user);
        }
    });
}