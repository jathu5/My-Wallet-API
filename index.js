// import packages
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

// global constants
const port = 5000;

// middlewares to access client-side javascript
app.use(express.static("public"));
app.use("/", express.static(__dirname + "public/css"));

// parse all body requests
app.use(express.json());

// additional parser in case needed
app.use(cookieParser());

// middleware to handle all required requests
app.use("/user", require("./routes/otherRequests.js"));
app.use("/user", require("./routes/postRequests.js"));

// connect html files to client-side javascript
const connectPages = (path) => {
  app.get(path, (req, res) => {
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
mongoose.connect(
  "mongodb+srv://user:password101@notable.uvjod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database connected [ignore]");
  }
);

// boot server
app.listen(process.env.PORT || port, () => {
  console.log("\nserver running [ignore]");
});
