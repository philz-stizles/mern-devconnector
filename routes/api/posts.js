const express = require('express');
const { check } = require('express-validator');
const { 
    createPost, 
    getAllPosts, 
    getPost, 
    deletePost, 
    likePost, 
    unLikePost,
    addCommentToPost,
    removeCommentFromPost
} = require('../../controllers/postControllers');

const router = express.Router();

// @route [POST, GET] api/posts
// @description
// @access Private
router.route('/')
    .post([
        check('text', 'Text is required').not().isEmpty()
    ], createPost)
    .get(getAllPosts);

// @route [GET, DELETE] api/posts
// @description
// @access Private
router.route('/:id')
    .get(getPost)
    .delete(deletePost);

// @route [PUT] api/posts/like/:id
// @description
// @access Private
router.put('/like/:id', likePost);

// @route [PUT] api/posts/unlike/:id
// @description
// @access Private
router.put('/unlike/:id',unLikePost);

// @route [PUT] api/posts/comment
// @description
// @access Private
router.post('/comment/:id', [
    check('text', 'Text is required').not().isEmpty()
], addCommentToPost);

// @route [PUT] api/posts/comment/:id
// @description
// @access Private
router.delete('/comment/:post_id/:comment_id', removeCommentFromPost);

module.exports = router;