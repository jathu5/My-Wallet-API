// import packages and other schemas
const mongoose = require('mongoose');
const accountSchema = require('./Account.js');
const accountModel = mongoose.model('Accounts', accountSchema);

// creates the default accounts for the user
const createAccount = accountName => {
    if (accountName) {
        return new accountModel({
            name: accountName,
            code: accountName.toLowerCase(),
            image: 'images/' + accountName.toLowerCase() + '.png'
        });
    } else {
        return new accountModel({});
    }
}
const makeAccounts = () => {
    const maxAccounts = 8;
    let defaultAccounts = [];
    defaultAccounts.push(createAccount('CASH'));
    defaultAccounts.push(createAccount('OTHER'));
    for (let i = 2; i < maxAccounts; ++i) {
        defaultAccounts[i] = createAccount();
    }
    return defaultAccounts;
}

// define userSchema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    }, email: {
        type: String,
        required: true,
    }, username: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }, password: {
        type: String,
        required: true,
        min: 8,
        max: 500
    }, balance: {
        type: Number,
        default: 0
    }, lastDate: {
        type: Date,
        default: Date.now
    }, lastLog: {
        type: String,
        default: null
    }, accounts: {
        type: [accountSchema],
        default: makeAccounts()
    }
});

// export userSchema
module.exports = mongoose.model('Users', userSchema);