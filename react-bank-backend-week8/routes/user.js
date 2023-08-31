const express = require('express');
const { signUpController, signInController}= require('../controllers/user');
const { body } = require('express-validator')
const userModel = require("../models/user");
const router = express.Router();

router.put("/signup",[
    body("name").trim().not().isEmpty().withMessage("Enter name"),
    body("email").isEmail().withMessage("Please Enter a Valid Email Address")
    .custom((value, {req}) => {
        return userModel.findOne({email: value}).then(
            userInfo => {
                if(userInfo)
                return Promise.reject("Email has already been taken");
            }
        )
    }),
    body("password").trim().isLength({min: 6, max: 18})
], signUpController);

 router.post("/signin", [
    body("email").isEmail().withMessage("This Email is invalid"),
    body("password").trim().isLength({min: 6, max: 18})
 ], signInController);

module.exports = router;