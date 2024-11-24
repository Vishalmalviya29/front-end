const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "vishalisa$goodboy";

router.post(
  "/signup",
  //    [
  //        body("name", "enter valid name").isLength({ min: 3 }),
  //        body("email", "enter valid email").isEmail(),
  //        body("password", "enter valid password").isLength({ min: 5 })
  //    ],
  async (req, res) => {
    let success = false;
    //const errors = validationResult(req)

    //if(!errors.isEmpty()) {
    //    return res.status(400).json( { success, errors: errors.array() } )
    //}

    try {
      let OneUser = await User.findOne({ email: req.body.email });
      if (OneUser) {
        return res.status(400).json({ error: "user already exists" });
      }

      OneUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const authToken = jwt.sign(OneUser.id, JWT_SECRET);
      success = true;
      res.json({ success, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
