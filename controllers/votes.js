const express = require("express");
const mongoose = require("../db/connection");
const Song = require("../models/song");
const router = express.Router();

router.put("/upvote", (req, res) => {
  Song.findByIdAndUpdate(
    { _id: req.body.body },
    { $inc: { votes: 1 } },
    { new: true }
  )
    .then(song => {
      res.json(song);
    })
    .catch(err => console.log(err));
});

router.put("/downvote", (req, res) => {
  Song.findByIdAndUpdate(
    { _id: req.body.body },
    { $inc: { votes: -1 } },
    { new: true }
  )
    .then(song => {
      res.json(song);
    })
    .catch(err => console.log(err));
});

module.exports = router;
