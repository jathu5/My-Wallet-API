// import from local file and define document inputs and buttons
import { getToken } from './helpers/cautionTable.js';

const home = document.getElementById('home');
const signup = document.getElementById('signup');
const rad = document.getElementById('radio');
const signin = document.getElementById('signin');
const signOption = document.getElementById('signinOption');
const inputs = [document.getElementById('identifier'), document.getElementById('password')];

// redirect page to home or signup
home.addEventListener('click', () => {
    window.location.href = '/';
});
signup.addEventListener('click', () => {
    window.location.href = '/signup';
});

// user can confirm sign in when enter is click in text inputs
inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        const enterKey = 13;
        if (e.keyCode === enterKey) {
            signinAttempt();
        }
    });
});

// change input to email to username or vice versa when radio button clicked
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

// check if sign in information is valid and send error message or allow user to proceed, accordingly
const signinAttempt = () => {
    let data = {
        password: inputs[1].value
    }

    data[signOption.textContent.toLowerCase()] = inputs[0].value;
    getToken('/user/signin', data);
}

// check if user clicks sign in button
signin.addEventListener('click', () => {
    signinAttempt();
});

// automatically sign out user
fetch('user/clear/authToken', {
    method: 'POST',
    credentials: 'same-origin'
}).then(res => { });