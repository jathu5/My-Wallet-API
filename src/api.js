// import packages
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
// const serverless = require("serverless-http");
require("dotenv").config();
mongoose.set('strictQuery', false);

// global constants
const port = process.env.PORT || 8000;
// const port = 8000;

// middlewares to access client-side javascript
router.use(express.static("src/public"));
router.use("/", express.static(__dirname + "src/public/css"));

// parse all body requests and cookies
router.use(express.json());
router.use(cookieParser());

// middleware to handle all required requests
router.use("/user", require("./routes/otherRequests.js"));
router.use("/user", require("./routes/postRequests.js"));

// connect html files to client-side javascript
const connectPages = (path) => {
  router.get(path, (req, res) => {
    if (path === "") {
      path = "/home";
    }
    res.sendFile(`${__dirname}/views${path}.html`);
  });
};

connectPages("");
connectPages("/signin");
connectPages("/signup");
connectPages("/console");

// connect to database
mongoose.connect(process.env.MONGODB_URI || 
  "mongodb+srv://user:password101@wallet.df7njs9.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database connected [ignore]");
  }
);

// use functions from netlify
// app.use("/.netlify/functions/api", router);
app.use(router);

// module.exports.handler = serverless(app);
// boot server
app.listen(port, () => {
  console.log("\nserver running [ignore]");
});
