// import packages
const router = require('express').Router();
const decoder = require('jwt-decode');

// import from other modules
const User = require('../models/User.js');
const verify = require('../validation/verifyToken.js');

const defaultErr = 400;

router.get('/', verify, async (req, res) => {
    try {
        res.send(await User.findOne({ username: req.user.username }));
    } catch (err) {
        res.status(defaultErr).send({ error: err });
    }
});

router.get('/or', async (req, res) => {
    try {
        res.send(await User.find());
    } catch (err) {
        res.status(defaultErr).send({ error: err });
    }
});

router.delete('/delete/:username', async (req, res) => {
    try {
        res.send(await User.remove({ username: req.params.username }));
    } catch (err) {
        res.status(defaultErr).send({ error: err });
    }
});

router.patch('/update-account/:username', async (req, res) => {
    try {
        res.send(await User.replaceOne({ username: req.params.username }, req.body));
    } catch (err) {
        res.status(defaultErr).send({ error: err });
    }
})

// export router to middleware
module.exports = router;