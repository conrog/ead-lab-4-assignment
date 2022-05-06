const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const models = require("../models/users");
const { mongoConnection } = require("../models/connection");

router.post("/login", async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$%£&@]){10}/)
        .required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let checkUserLogin = await models.verifyUser(result.value);
    if (checkUserLogin.error) {
      throw checkUserLogin.message;
    }

    // set session for the logged in user
    req.session.user = {};
    for (let key in checkUserLogin.data) {
      if (key === "_id" || key === "password") continue;
      req.session.user[key] = checkUserLogin.data[key];
    }

    res.json(checkUserLogin);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const schema = joi.object().keys({
      name: joi
        .string()
        .min(1)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$%£&@]){10}/)
        .required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let addUserResponse = await models.addUser(result.value);
    res.json(addUserResponse);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/user", (req, res) => {
  res.send(req.session.user);
});

router.post("/user", (req, res) => {
  let findUser = { name: req.session.user.name };
  let newValues = { $set: { ...req.body } };

  mongoConnection
    .collection("users")
    .updateOne(findUser, newValues, function (err, res) {
      if (err) {
        console.log(err);
      }
    });

  for (let key in req.body) {
    if (key === "_id" || key === "password") continue;
    req.session.user[key] = req.body[key];
  }

  res.send(req.session.user);
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
});

module.exports = router;
