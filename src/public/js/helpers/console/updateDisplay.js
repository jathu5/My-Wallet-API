const showAmount = (user, i, slotAmount) => {
    let amount = user.accounts[i].amount;
    if (amount < 0) {
        amount = `(${(-amount).toFixed(2)})`;
    } else {
        amount = amount.toFixed(2);
    }
    slotAmount.textContent = `$ ${amount}`;
}

export const updateDisplay = (user) => {
    const accountsCount = 8;
    const codeConsole = document.getElementById('console');
    const balanceLabel = document.getElementById('balance');
    let userBalance = user.balance;

    codeConsole.value = '';

    if (userBalance < 0) {
        userBalance = `(${(-userBalance).toFixed(2)})`;
    } else {
        userBalance = `${userBalance.toFixed(2)}`;
    }
    balanceLabel.textContent = `Balance: $${userBalance}`;

    for (let i = 2; i < accountsCount; ++i) {
        const slotName = document.getElementById('slot' + i + '-name');
        const slotAmount = document.getElementById('slot' + i + '-amount');
        const slotIcon = document.getElementById('slot' + i + '-icon');
        if (user.accounts[i].name) {
            slotName.textContent = `${user.accounts[i].name} - ${user.accounts[i].code}`;
            slotIcon.src = user.accounts[i].image;
            showAmount(user, i, slotAmount);
        } else {
            slotName.textContent = 'CLICK TO ADD ACCOUNT';
            slotIcon.src = 'images/add.png';
            slotAmount.textContent = 'N/A';
        }
    }

    for (let i = 0; i < 2; ++i) {
        const slotAmount = document.getElementById('slot' + i + '-amount');
        showAmount(user, i, slotAmount);
    }
}