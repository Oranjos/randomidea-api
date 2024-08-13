const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// const ideas = [
// {
// id: 1,
// // text: "Positive Newsletter, a newsletter that only shares positive, uplifting news",
// tag: "Technology",
// username: "TonyStark",
// date: "2022-01-02",
// },
// {
// id: 2,
// text: "Milk cartons that turn a different color the older your milk is getting",
// tag: "Inventions",
// username: "SteveRogers",
// date: "2022-01-02",
// },
// {
// id: 3,
// // text: "ATM location app which lets you know where the closest ATM is and if it is in service",
// tag: "Software",
// username: "BruceBanner",
// date: "2022-01-02",
// },
// ];

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get a single idea from Ideas
// router.get("/:id", (req, res) => {
// const idea = ideas.find((idea) => idea.id === +req.params.id);
//
// if (!idea) {
// return res
// .status(404)
// .json({ success: false, error: "Resource not found" });
// }
// res.json({ success: true, data: idea });
// });

// Get a single data from the database
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Add an idea aka Post request
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update idea
// router.put("/:id", (req, res) => {
// const idea = ideas.find((idea) => idea.id === +req.params.id);
//
// if (!idea) {
// return res
// .status(404)
// .json({ success: false, error: "Resource not found" });
// }
//
// idea.text = req.body.text || idea.text;
// idea.tag = req.body.tag || idea.tag;
//
// res.json({ success: true, data: idea });
// });

// Update idea to a database
router.put("/:id", async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete idea
// router.delete("/:id", (req, res) => {
// const idea = ideas.find((idea) => idea.id === +req.params.id);
//
// if (!idea) {
// return res
// .status(404)
// .json({ success: false, error: "Resource not found" });
// }
//
// const index = ideas.indexOf(idea);
// ideas.splice(index, 1);
//
// res.json({ success: true, data: {} });
// });

// Delete idea from database
router.delete("/:id", async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
