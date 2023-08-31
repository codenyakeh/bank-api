const userModal = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpController = (req, res) => {
  // validation checks
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ message: errors.array()[0].msg });
  }
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 6)
    .then((hashedPassword) => {
      const user = new userModal({ name, email, password: hashedPassword });

      user
        .save()
        .then((user) => {
          res.json({
            message: "signup successful",
            data: { name: user.name, email: user.email },
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const signInController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    //find user
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.json({ message: "user not found" });
    }
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      return res.json({ message: "email and password is incorrect" });
    }
    const token = jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      "supersecretkeythatcannotbeeasilyguessed",
      { expiresIn: "1h" }
    );

    return res.json({ message: "Sign in Successful", token });
  } catch (error) {
    res.json({ message: "Error Please try again" });
  }
};
module.exports = {
  signUpController,
  signInController,
};
