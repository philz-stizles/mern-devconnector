import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
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
        // dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteEducation = (id) => async dispatch => {
    try {
        const response = await axios.delete(`/api/profile/me/education/${id}`);
        console.log(response.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data
        })
        dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteExperience = (id) => async dispatch => {
    try {
        const response = await axios.delete(`/api/profile/me/experience/${id}`);
        console.log(response.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data
        })
        dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                message: error.response.data.message,
                statusText: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure. This can NOT be undone')) {
        try {
            const response = await axios.delete(`/api/profile/me`);
            console.log(response.data);
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert('success', response.data.message))
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.data.message,
                    statusText: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}