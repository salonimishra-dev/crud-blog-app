const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
  { id: uuidv4(), username: "Saloni", content: "First sample post!" },
  { id: uuidv4(), username: "Guest", content: "Welcome to my blog!" }
];

// HOME — All Posts
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// New Post Form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Create Post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

// Show Single Post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("show", { post });
});

// Edit Form
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit", { post });
});

// Update Post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  post.content = req.body.content;
  res.redirect("/posts");
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/posts");
});

app.listen(port, () => console.log(`Server running at ${port}`));
