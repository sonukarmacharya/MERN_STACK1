const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      // console.log(data);
      res.json({ status: 200, lists: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 400, message: "Error", error: err });
    });
});

router.route("/saves").post((req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);

  newBlogPost.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry somethg went wrong" });
      return;
    }
    return res.json({ msg: "Data is saved" });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "abc2",
    age: 10,
  };
  res.json(data);
});
module.exports = router;
