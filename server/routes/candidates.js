const router = require("express").Router();
const People = require("../models/people-model.js");
const {isAuthenticated} = require("../helper/helper.js");
// GET ALL candidates

router.get("/api/candidate",isAuthenticated, async (req, res) => {
  const user = await People.find().lean();
  res.render("candidates/AllCandidates", { user });
});
// GET  candidate BY ID
router.get("/api/candidate/:id", async (req, res) => {
  const {user_id} = req.params;
  await People.findById(user_id).then((user) =>
    res.json(user).catch((error) =>
      res.json(error, {
        message: "No results",
        error: 404,
      })
    )
  );
});
//upload candidate
router.get("/upload/candidate",isAuthenticated, (req, res) => {
  res.render("candidates/UploadCandidate");
});
router.post("/upload/newCandidate", async (req, res) => {
  const {name, country, skills, description, email} = req.body;
    const users = new People({name, country, skills, description, email});
    await users.save();
    if (!users) {
      return res.status(400).json({error: "Something went wrong"});
    } else {
      res.render("candidates/UpdateMessage");
    }
});
//update candidate
router.get("/update/updated-candidate/:id",isAuthenticated,async (req, res) => {
  const candidate = await People.findById(req.params.id).lean();
  res.render("candidates/EditCandidates",{candidate})
});
router.put(
  "/update/updated-candidate/:id",async (req, res) => {
    const {name, country, skills, description, email} = req.body;
    const Update = {name, country, skills, description, email};
    await People.findByIdAndUpdate(req.params.id, Update);
    if (!(await People.findByIdAndUpdate(req.params.id, Update))) {
      return res.status(400).json({error: "Something went wrong"});
    } else {
      res.render("candidates/UpdateMessage");
    }
  }
);
// delete candidate
router.delete(
  "/delete/deleted-candidate/:id",isAuthenticated,
  async (req, res) => {
    const user = await People.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "Candidate not found",
      });
    } else {
      res.render("candidates/UpdateMessage");
    }
  }
  
);

module.exports = router;
