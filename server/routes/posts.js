const express = require('express');
const router = express.Router();

// Post Model
const Post = require('../models/Post');

// @route GET api/posts
// @desc Get All Posts
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
});

module.exports = router;
