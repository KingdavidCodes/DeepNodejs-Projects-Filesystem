const asyncHandler = require('express-async-handler');

//* @desc Get all posts
//* @route GET /api/posts
//* access Public
const getAllPosts = asyncHandler( async(req, res) => {
  res.send("getting all post")
});


//* @desc Create posts
//* @route POST /api/posts
//* access Public
const createPosts = asyncHandler( async(req, res) => {
  res.send("creating new post")
});


//* @desc Get single posts
//* @route GET /api/posts/:id
//* access Public
const getSinglePost = asyncHandler( async(req, res) => {
  const { id: postID } = req.params;
  res.send("get a single post");
});

//* @desc Update single post
//* @route PUT /api/posts/:id
//* access Publ
const updatePost = asyncHandler( async(req, res) => {
  res.send("updating a single post");
});

//* @desc Delete single post
//* @route PUT /api/posts/:id
//* access Public
const deletePost = asyncHandler( async(req, res) => {
  res.send("deleting a single post");
});

module.exports = {
  getAllPosts,
  createPosts,
  getSinglePost,
  updatePost,
  deletePost
}