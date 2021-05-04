// import packages
const mongoose = require('mongoose');

// define schema
const accountSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 20,
        default: null
    }, code: {
        type: String,
        min: 1,
        max: 20,
        default: null
    }, image: {
        type: String,
        default: 'images/add.png'
    }, amount: {
        type: Number,
        default: 0
    }
});

// export schema as a schema definition
module.exports = accountSchema;