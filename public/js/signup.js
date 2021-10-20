// import local file and define global inputs
import { getToken } from "./helpers/cautionTable.js";
const back = document.getElementById('back');
const inputs = document.querySelectorAll('input');
const confirm = document.getElementById('make-account');

// redirect user to sign in page
back.addEventListener('click', () => {
    window.location.href = '/signin';
});

// additional functionality
inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        const enterKey = 13;
        if (e.keyCode === enterKey) {
            confirmAttempt();
        }
    });
});

// check if user sign up details valid and send error message or allow access accordingly
const confirmAttempt = () => {
    const data = {
        name: inputs[0].value.toLowerCase(),
        email: inputs[1].value.toLowerCase(),
        username: inputs[2].value,
        password: inputs[3].value,
        confirmed: inputs[4].value
    }
    console.log("hey")
    // getToken('/user/signup', data);
}
confirm.addEventListener('click', () => {
    confirmAttempt();
});