const express = require('express');
const { getAllPosts, createPosts, getSinglePost, updatePost, deletePost } = require('../controller/postController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();


router.use(validateTokenHandler);

router.route('/')
.get(getAllPosts)
.post(createPosts);


router.route('/:id')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost);


module.exports = router;