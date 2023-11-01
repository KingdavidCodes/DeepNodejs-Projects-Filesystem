const express = require('express');
const { getAllPosts, createPosts, getSinglePost, updatePost, deletePost } = require('../controller/postController');
const router = express.Router();


router.route('/')
.get(getAllPosts)
.post(createPosts);


router.route('/:id')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost);


module.exports = router;