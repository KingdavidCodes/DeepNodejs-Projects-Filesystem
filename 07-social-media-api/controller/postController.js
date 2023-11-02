const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Post = require('../models/postModel');



//* @desc Get all posts
//* @route GET /api/posts
//* access Private
const getAllPosts = asyncHandler( async(req, res) => {
  const { numLikes } = req.query;
  const queryCollection = {};
  queryCollection['user_id'] = req.user.id;

  if(numLikes){
    const rateOperators = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numLikes.replace(regEx, (match) => `-${rateOperators[match]}-`);

    const options = ['likes'];

    filters = filters.split(',').forEach((filter) => {
      const[field, operator, value] = filter.split('-');

      if(options.includes(field)){
        queryCollection[field] = { [operator]: Number(value) }
      }
    });
  }

  const post = await Post.find({ user_id: req.user.id});
  res.status(200).json({nbHits: post.length, post});
});


//* @desc Create posts
//* @route POST /api/posts
//* access Private
const createPosts = asyncHandler( async(req, res) => {
  const { post: postBody, likes } = req.body
  if(!postBody){
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const post = await Post.create({
    user_id: req.user.id,
    post: postBody,
    likes
  })
  res.status(201).json(post);
});


//* @desc Get single posts
//* @route GET /api/posts/:id
//* access Private
const getSinglePost = asyncHandler( async(req, res) => {
  const { id: postID } = req.params;
  if(!postID || !mongoose.isValidObjectId(postID)){
    res.status(400);
    throw new Error("Please input a valid ID");
  }
  const post = await Post.findOne({_id: postID});
  if(post.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to access other post");
  }


  // * checking if post with the ID cant be found
  if(!post){
    res.status(404);
    throw new Error('Post not found');
  }

  res.status(200).json(post);
});

//* @desc Update single post
//* @route PUT /api/posts/:id
//* access Private
const updatePost = asyncHandler( async(req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOne({ _id: postID});

  if(!postID || !mongoose.isValidObjectId(postID)){
    res.status(400);
    throw new Error("Please input a valid ID");
  }

  // * validation to stop users from editing others contact
  if(post.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other user post");
  }

  if(!post){
    res.status(404);
    throw new Error('Post not found');
  }else {
    const updatePost = await Post.findByIdAndUpdate(
      postID,
      req.body,
      {new: true}
    );
    res.status(200).json(updatePost);
  }
});

//* @desc Delete single post
//* @route PUT /api/posts/:id
//* access Private
const deletePost = asyncHandler( async(req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOne({ _id: postID});
  if(!postID || !mongoose.isValidObjectId(postID)){
    res.status(400);
    throw new Error("Please input a valid ID");
  }
  
  if(post.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to delete other user post");
  }



  if(!post){
    res.status(404);
    throw new Error('Post not found');
  }else {
    await Post.deleteOne({_id: postID});
    res.status(200).json(post);
  }
});

module.exports = {
  getAllPosts,
  createPosts,
  getSinglePost,
  updatePost,
  deletePost
}