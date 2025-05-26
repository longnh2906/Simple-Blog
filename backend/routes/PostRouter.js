const express = require("express");
const Post = require("../db/postModel");
const User = require("../db/userModel");
const router = express.Router();
router.post("/post", async (request, response) => {
  const post = new Post(request.body);
  try {
    await post.save();
    response.send(post);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    response.send(posts);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/users", async (request, response) => {
  try {
    const users = await User.find({}, "_id username password");
    console.log(users);
    response.send(users);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    response.send(post);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

router.get("/search/term", async (req, res) => {
  const term = req.query.q?.toLowerCase() || "";
  try {
    const posts = await Post.find({
      slug: { $regex: term, $options: "i" },
    });
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ numberOfPosts: count });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
