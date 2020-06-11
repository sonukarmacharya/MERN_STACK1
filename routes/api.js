const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  BlogPost.find()
    .sort({ date: -1 })
    .then((data) => {
      res.json({ status: 200, lists: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 400, message: "Error", error: err });
    });
});

router.get("/:id", (req, res) => {
  BlogPost.findById(req.params.id, function (err, data) {
    res.json({ status: 200, lists: data });
  });
});
router.put("edit/:id", (req, res) => {
  BlogPost.findByIdAndUpdate(req.params.id)
    .then((data) => {
      res.json({ status: 200, lists: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 400, message: "Error", error: err });
    });
});
router.post("/saves", (req, res) => {
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

router.delete("/:id", (req, res) => {
  BlogPost.findById(req.params.id)
    .then((data) =>
      data.remove().then(() => res.json({ success: true, data: data }))
    )
    .catch((err) => res.json({ success: false }));
});

router.put("/edit/:id", (req, res) => {
  BlogPost.findById(req.params.id)
    .then((data) => {
      data.title = req.body.title;
      data.body = req.body.body;

      data
        .save()
        .then(() => res.json("updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => console.log(err));
});
module.exports = router;
