import { 
    GET_POSTS,
    POSTS_ERROR
} from '../types';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get('/api/posts');
        console.log(response.data);
        dispatch({
            type: GET_POSTS,
            payload: response.data.data
        })
        // dispatch(setAlert('success', response.data.message))
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