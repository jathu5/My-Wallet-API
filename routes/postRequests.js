// import packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import from other modules
const User = require("../models/User.js");
const {
  signupValidation,
  emailSignValidation,
  userSignValidation,
} = require("../validation/validateInput.js");

// global constant
const defaultErr = 400;

// check if signup information is valid and post to database
router.post("/signup", async (req, res) => {
  // console.log(User);
  console.log(await User.findOne({}));
  // console.log(User.findOne({ username: body.username }));

  res.send({ error: "none" });

  const body = req.body;
  const { error } = signupValidation(body);
  if (error) {
    res.send({ error: error.details[0].message });
  } else if (await User.findOne({ username: body.username })) {
    res.send({ error: "Username already exists" });
  } else if (await User.findOne({ email: body.email })) {
    res.send({ error: "Email already exists" });
  } else if (body.password !== body.confirmed) {
    res.send({ error: "Passwords do not match" });
  } else {
    const hashPassword = await bcrypt.hash(
      body.password,
      await bcrypt.genSalt(10)
    );

    const user = new User({
      name: `${body.name[0].toUpperCase()}${body.name.substring(1)}`,
      email: body.email.toLowerCase(),
      username: body.username,
      password: hashPassword,
    });

    try {
      res.send(await user.save());
    } catch (err) {
      res.status(defaultErr).send(err);
    }
  }
});

// check if signin information is valid and allow access to user by granting token
router.post("/signin", async (req, res) => {
  const emailError = emailSignValidation(req.body).error;
  const userError = userSignValidation(req.body).error;
  console.log("here");

  const checkValid = async (res, findObj, field) => {
    const user = await User.findOne(findObj);
    if (!user) {
      res.send({ error: field + " does not exist" });
    } else {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          { username: user.username },
          process.env.tokenSecret
        );
        res.cookie("authToken", token, { maxAge: 3600000 });
        user.lastDate = Date.now();
        res.send(await user.save());
      } else {
        res.send({ error: `${field} or password is incorrect` });
      }
    }
  };

  if (emailError && userError) {
    if (typeof req.body.username === "string") {
      res.send({ error: userError.details[0].message });
    } else {
      res.send({ error: emailError.details[0].message });
    }
  } else if (userError) {
    checkValid(res, { email: req.body.email }, "email");
  } else {
    checkValid(res, { username: req.body.username }, "username");
  }
});

// clear cookie from browser storage
router.post("/clear/:cookie", async (req, res) => {
  try {
    res.clearCookie(req.params.cookie).send({ success: "cleared" });
  } catch {
    res.status(defaultErr).send({ error: "invalid token" });
  }
});

// export router to middleware
module.exports = router;
