const express = require("express");
const body = require("express-validator");
const BankModel = require("../models/bank");
const isAuth = require("../middlewares/isAuth");
const {
  listBanksController,
  createBanksController,
  updateBanksController,
  deleteBanksController,
} = require("../controllers/bank");
const router = express.Router();

//route
router.post(
  "/bank",
  isAuth,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name field cannot be empty")
      .isAlpha(),
    body("location")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Location field cannot be empty")
      .isAlpha(),
    body("branch")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Branch field cannot be empty")
      .isAlpha(),
    body("phone")
      .isMobilePhone("en-GH")
      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((bankInfo) => {
          if (bankInfo) return Promise.reject("This Phone number Is already in use");
        });
      }),
  ],
  createBanksController
);

// list Bank Get Method
router.get("/bank/:id?", isAuth, listBanksController);

// Update Bank Put Method
router.put("/bank/:id", isAuth, updateBanksController);

// Delete Bank Delete Method
router.delete("/bank/:id", isAuth, deleteBanksController);

module.exports = router;
