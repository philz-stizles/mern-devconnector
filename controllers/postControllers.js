const { validationResult } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
            .json({
                status: false,
                data: errors.array()
            });
    }

    const { text } = req.body

    try {
        const existingUser = await User.findById(req.user.id).select('-password');
        if(!existingUser){
            return res.status(400)
                .json({
                    status: false,
                    message: 'User not found'
                });
        }

        const newPost = new Post({
            user: req.user.id,
            text,
            name: existingUser.name,
            avatar: existingUser.avatar

        });

        const post = await newPost.save();
        return res.status(201).json({
            status: true,
            data: post,
            message: 'Post created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ date: -1});

        res.status(200).json({
            status: true,
            data: posts,
            message: 'Posts retrived successfully'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        res.status(200).json({
            status: true,
            data: post,
            message: 'Post retrived successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}

exports.deletePost = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id);
        if(!existingPost) {
            return res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        // Check that current user is owner of post
        if(existingPost.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: false,
                message: 'User not authorized'
            })
        }

        await existingPost.remove();

        res.status(200).json({
            status: true,
            message: 'Post removed successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        if(post.likes.filter(item => item.user.toString() === req.user.id ).length > 0) {
            return res.status(400).json({
                status: false,
                message: 'Post already liked'
            })
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.status(200).json({
            status: true,
            data: post.likes,
            message: 'Post liked successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}

exports.unLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        if(post.likes.filter(item => item.user.toString() === req.user.id ).length <= 0) {
            return res.status(400).json({
                status: false,
                message: 'Post not liked'
            })
        }

        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save()

        res.status(200).json({
            status: true,
            data: post,
            message: 'Post unliked successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}

exports.addCommentToPost = async (req, res) => {
    const { text } = req.body;
    try {
        const user = await User.findById(req.user.id).select('-password');
        const existingPost = await Post.findById(req.params.id);
        if(!existingPost) {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        const { name, avatar } = user;
        const newComment = { text, name, avatar, user: req.user.id };

        existingPost.comments.unshift(newComment);

        await existingPost.save();

        res.status(200).json({
            status: true,
            data: existingPost.comments,
            message: 'Comment added successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}

exports.removeCommentFromPost = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.post_id);
        if(!existingPost) {
            return res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }

        const existingComment = existingPost.comments.find(item => item.id === req.params.comment_id);
        if(!existingComment) {
            return res.status(404).json({
                status: false,
                message: 'Comment does not exist'
            })
        }

        if(existingComment.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: false,
                message: 'User not authorized'
            })
        }

        const removeIndex = existingPost.comments.map(item => item.id.toString()).indexOf(req.params.comment_id);
        existingPost.comments.splice(removeIndex, 1);

        await existingPost.save()

        res.status(200).json({
            status: true,
            data: existingPost.comments,
            message: 'Comment removed from post successfully'
        })
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            res.status(404).json({
                status: false,
                message: 'Post not found'
            })
        }
        res.status(500).send('Server error');
    }
}