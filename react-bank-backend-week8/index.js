const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountRoute = require("./routes/account")
const bankRoute = require("./routes/bank")
const userRoutes = require("./routes/user");
const cors = require("cors");

// Express Server
const server = express();
const handleError = (req, res, next) => {
  console.log("Error Page");
  next();
};

//Middleware
server.use(bodyParser.json());
server.use(cors());

// Routes
server.use(accountRoute);
server.use(bankRoute);
server.use(userRoutes);
server.get("*", handleError, (req, res) => {
  res.send("404 page not found");
});

// Connecting To Mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://pharez:pharez123@cluster0.pybk5g2.mongodb.net/bankTwo?retryWrites=true&w=majority",
    // { useNewUrlParser: true, uesUnifiedTopology: true}
    console.log("MongoDB is Connect")
  )
  .then((result) => {
    // Start Server
    server.listen(5000, "localhost", () => console.log("Server is Connected"));
  })
  .catch((err) => console.log(err));
