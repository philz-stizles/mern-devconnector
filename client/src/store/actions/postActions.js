import { 
    GET_POSTS,
    POSTS_ERROR
} from '../types';
import axios from 'axios';

export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get('/api/posts');
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })

    } catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const addPost = (data) => async dispatch => {
    try {
        const response = await axios.post('/api/posts', data);
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })
        
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        const response = await axios.delete(`/api/posts/${id}`);
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })
        
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const addLike = (data) => async dispatch => {
    try {
        const response = await axios.put('/api/posts', data);
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })
    
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const removeLike = (data) => async dispatch => {
    try {
        const response = await axios.post('/api/posts', data);
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })
        
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: POSTS_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}