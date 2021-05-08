export const other = () => {
    helpFunc();
    instructionsFunc();
}

const helpFunc = () => {
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


export function instructionsFunc() {
    const information = document.getElementById('information');
    const instruction = document.getElementById('instruction');
    
    information.addEventListener('mouseenter', () => {
        instruction.style.display = 'block';
    });

    information.addEventListener('mouseout', () => {
        instruction.style.display = 'none';
    });
}