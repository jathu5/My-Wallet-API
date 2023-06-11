// import packages and another module with common functions
const jwt = require("jsonwebtoken");
const defaultErr = 400;

// verify if user is signed in
const verify = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).send({ error: "Access Denied" });
  } else {
    try {
      const tokenSecret = process.env.TOKEN_SECRET ||
        "WBTSoG==%5nMIWbfGW0BB#=@ehpi$64Z*lKVZ*+Wnsr*4aJpVW";
      const verified = jwt.verify(
        token, tokenSecret
      );
      req.user = verified;
      next();
    } catch (err) {
      res.status(defaultErr).send(err);
    }
  }
};

// export function
module.exports = verify;
