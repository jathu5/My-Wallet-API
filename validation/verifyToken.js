// import packages and another module with common functions
const jwt = require('jsonwebtoken');

// verify if user is signed in
const verify = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        res.status(401).send('Access Denied');
    } else {
        try {
            const verified = jwt.verify(token, process.env.tokenSecret);
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

// export function
module.exports = verify;