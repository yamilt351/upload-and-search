const router = require("express").Router();
const User = require("../models/model.js");
const passport = require("passport");

// routes
router.get("/user/signin", (req, res) => {
  res.render("handleuser/signin");
});
router.get("/user/signup", (req, res) => {
  res.render("handleuser/signup");
});
// creating user
router.post("/user/register", async (req, res) => {
  const {username, password, email, confirm_password} = req.body;
  if (password != confirm_password) {
    res.send({message: "passwords dont match"});
  }

  if (password.length < 4) {
    res.send({message: "your password should be longer"});
  }

  const emailUser = await User.findOne({email: email});
  const usernameUser = await User.findOne({username: username});

  if (emailUser || usernameUser) {
    res.send({message: "user already exists"});
  }
  const newUser = new User({ username, email, password });
  console.log(newUser);
  newUser.save((err) => {
    if (err) {
      console.log(err)
      res.send({message: "something went wrong"});
    } else {
      console.log(newUser)
      res.status(200).send("user register sucefully");
    }
  });
});

// authenticating user
router.post(
  "/user/authentication",
  passport.authenticate("local", {
    successRedirect: "/api/candidate",
    failureRedirect: "/user/signup",
  })
);

// logout user
// router.get("/user/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

router.get("/user/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
