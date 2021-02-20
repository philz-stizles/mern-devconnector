import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from './../store/actions/postActions'
import Spinner from '../components/Spinner'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, []);

    return (loading) 
        ? <Spinner /> 
        : (
            <Fragment>

            </Fragment>
        )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = ({ post }) => ({
    post
})

export default connect(mapStateToProps, { getPosts })(Posts
    )