import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import PostItem from './../components/posts/PostItem';
import PostForm from './../components/posts/PostForm';
import { getPosts } from '../store/actions/postActions';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the community
            </p>
            <PostForm />
            
            <div className='posts'>
                { posts.map(post => <PostItem key={post._id} post={post} />) }
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = ({post}) => ({
    post
});

export default connect(mapStateToProps, { getPosts })(Posts);
