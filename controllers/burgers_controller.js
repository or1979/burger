const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  burger.all(function (burger_data) {
    res.render("index", { burger_data });
  });
});


router.post("/burgers/create", function (req, res) {
  if (req.body.burger_name == "") {
    console.log("No burger name entered");
    res.redirect("/");
  } else {
    burger.create(req.body.burger_name, function (result) {

      console.log(result);
      res.redirect("/");
    });
  }
});

router.put("/burgers/update", function (req, res) {
  burger.update(req.body.burger_id, function (result) {

    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;