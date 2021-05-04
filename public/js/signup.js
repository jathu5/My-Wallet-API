import { getMessage } from "./helpers/cautionTable.js";

const back = document.getElementById('back');
const inputs = document.querySelectorAll('input');
const confirm = document.getElementById('make-account');

back.addEventListener('click', () => {
    window.location.href = '/signin';
});

inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        const enterKey = 13;
        if (e.keyCode === enterKey) {
            confirmAttempt();
        }
    });
});

const confirmAttempt = () => {
    const data = {
        name: inputs[0].value.toLowerCase(),
        email: inputs[1].value.toLowerCase(),
        username: inputs[2].value,
        password: inputs[3].value,
        confirmed: inputs[4].value
    }
    getMessage('/user/signup', data);
}

confirm.addEventListener('click', () => {
    confirmAttempt();
});