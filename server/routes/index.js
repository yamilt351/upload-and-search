const router = require("express").Router();

//Routes
router.get("/", (req, res) => {
    res.render("index")
})

router.get("/About", (req, res) => {
  res.render("about");
});


module.exports = router;