const express = require("express");
const {
    listAccountsController,
    createAccountsController,
  } = require("../controllers/account");
const router = express.Router();


//route

//createAccount Post Method
router.post(
  "/account",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This field must not be empty")
      .isAlpha(),
    body("accountType")
      .trim()
      .not()
      .isEmpty()
      .withMessage("This field must not be empty")
      .isAlpha(),
    body("number")
      .isLength({ min: 6, max: 18 })
      .withMessage("Number must not be below 6 and above 18 digits ")
      .isNumeric(),
  ],
  createAccountsController
);

//listAccounts get Method
router.get("/account", listAccountsController);

module.exports = router;