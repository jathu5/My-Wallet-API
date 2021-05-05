import { showMessage, hideMessage } from './helpers/cautionTable.js'

const wallet = document.getElementById('wallet');
const sign = document.getElementById('sign');

const goSign = () => {
    window.location.href = 'signIn';
}

sign.addEventListener('click', () => {
    goSign();
});

document.body.style.cursor = 'pointer';
const changeSettings = (textValues) => {

    for (let i in textValues) {
        const block = document.getElementById(`block-${i}`);
        block.textContent = textValues[i];
        block.addEventListener('hover', () => {
            document.body.style.cursor = 'pointer';
        });
    }
}

const clearToken = () => {/*
    fetch('user/clear/authToken', {
        method: 'POST',
        credentials: 'same-origin'
    }).then(res => { });*/
}

const hoverSettings = (textValues, user) => {
    let hoverValues = ['CLICK TO SIGN OUT', 'CLICK TO PERMANENTLY DELETE ACCOUNT', user.name, user.email, user.username, `$ ${user.balance.toFixed(2)}`];
    const { lastDate } = user;
    hoverValues.push(`${lastDate.substring(0, 4)}/${lastDate.substring(5, 7)}/${lastDate.substring(8, 10)}`);

    if (user.lastLog === null) {
        hoverValues.push('No Logs In');
    } else {
        hoverValues.push(user.lastLog);
    }

    let blocks = [null, null];
    for (let i = 0; i < 8; ++i) {
        blocks[i] = document.getElementById(`block-${i}`);
    }

    blocks[0].addEventListener('click', () => {
        clearToken();
        goSign();
    });

    blocks[1].addEventListener('click', () => {
        clearToken();
        fetch('user/delete/' + user.username, { method: 'DELETE' }).then(res => { });
        goSign();
    });

    for (let i = 0; i < hoverValues.length; ++i) {
        blocks[i].addEventListener('mouseover', () => {
            blocks[i].textContent = hoverValues[i];
        });
        blocks[i].addEventListener('mouseout', () => {
            blocks[i].textContent = textValues[i];
        });
    }
}

const userSigned = user => {
    if (!JSON.parse(sessionStorage.getItem('signed'))) {
        clearToken();
    }

    hideMessage();
    sign.style.display = 'none';

    wallet.addEventListener('click', () => {
        window.location.href = 'console';
    });

    const textValues = ['SIGN OUT', 'DELETE USER', 'WALLET HOLDER NAME', 'EMAIL ADDRESS', 'USERNAME', 'CURRENT BALANCE', 'LAST SIGN IN', 'LAST LOG'];
    changeSettings(textValues);
    hoverSettings(textValues, user);
}

fetch('user')
    .then(res => res.json()).then(user => {
        if (!user.error) {
            userSigned(user);
        }
    }).catch(err => {
        wallet.addEventListener('click', () =>
            showMessage(true, 'Please sign in to access your wallet'))
    });