import { 
    GET_PROFILE,
    PROFILE_ERROR
} from '../types';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getLoggedInUserProfile = () => async dispatch => {
    try {
        const response = await axios.get('/api/profile/me');
        console.log(response.data);
        dispatch({
            type: GET_PROFILE,
            payload: response.data.data
        })
        dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                message: error.response.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}