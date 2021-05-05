import { getToken } from './helpers/cautionTable.js';

const home = document.getElementById('home');
const signup = document.getElementById('signup');
const rad = document.getElementById('radio');
const signin = document.getElementById('signin');
const signOption = document.getElementById('signinOption');
const inputs = [document.getElementById('identifier'), document.getElementById('password')];

home.addEventListener('click', () => {
    window.location.href = '/home';
});

signup.addEventListener('click', () => {
    window.location.href = '/signup';
});

const clickEnter = e => {
    const enterKey = 13;
    if (e.keyCode === enterKey) {
        signinAttempt();
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        clickEnter(e);
    });
});

rad.addEventListener('click', () => {
    const radioMessage = document.getElementById('radio-message');
    rad.checked = false;
    if (signOption.textContent === 'Email') {
        signOption.textContent = 'Username';
        radioMessage.textContent = ' Sign in by email instead';
    } else {
        signOption.textContent = 'Email';
        radioMessage.textContent = ' Sign in by username instead';
    }
});

const signinAttempt = () => {
    let data = {
        password: inputs[1].value
    }

    data[signOption.textContent.toLowerCase()] = inputs[0].value;
    getToken('/user/signin', data);
}

signin.addEventListener('click', () => {
    signinAttempt();
});

fetch('user/clear/authToken', {
    method: 'POST',
    credentials: 'same-origin'
}).then(res => { });