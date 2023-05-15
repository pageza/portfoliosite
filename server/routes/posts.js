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
// @route GET api/posts/:id
// @desc Get A Post
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(500).json({ success: false }))
});
// @route POST api/posts
// @desc Create A Post
router.post('/', (req, res) => {
    console.log(req.body);
    Post.create(req.body)
        .then(post => res.json(post))
});
// @route DELETE api/posts/:id
// @desc Delete A Post
router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
});
// @route UPDATE api/posts/:id
// @desc Update A Post
router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ success: true }))
});

module.exports = router;
