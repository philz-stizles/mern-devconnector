import { 
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
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
        dispatch({ type: CLEAR_PROFILE });
        
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

// Create or update profile
export const createOrEditProfile = (profileForm, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post('/api/profile', profileForm, config);
        console.log(response.data);
        dispatch({
            type: GET_PROFILE,
            payload: response.data.data
        })
        
        dispatch(setAlert('success', (edit) ? 'Profile Updated' : 'Profile Created'))

        if(!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        console.log(error.response);

        const errors = error.response.data.data;
        if(errors) {
            errors.forEach(error => dispatch(setAlert('danger', error.msg)));
        }

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

export const addProfileEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.put('/api/profile/me/education', formData, config);
        console.log(response.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data
        })
        
        dispatch(setAlert('success', response.data.message))

        history.push('/dashboard');

    } catch (error) {
        console.log(error.response);

        const errors = error.response.data.data;
        if(errors) {
            errors.forEach(error => dispatch(setAlert('danger', error.msg)));
        }

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

export const addProfileExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.put('/api/profile/me/experience', formData, config);
        console.log(response.data);
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.data
        })
        
        dispatch(setAlert('success', response.data.message))

        history.push('/dashboard');

    } catch (error) {
        console.log(error.response);

        const errors = error.response.data.data;
        if(errors) {
            errors.forEach(error => dispatch(setAlert('danger', error.msg)));
        }

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

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const response = await axios.get('/api/profile');
        console.log(response.data);
        dispatch({
            type: GET_PROFILES,
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

export const getProfileById = userId => async dispatch => {
    try {
        const response = await axios.get(`/api/profile/user/${userId}`);
        console.log(response.data);
        dispatch({ type: GET_PROFILE, payload: response.data.data })
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

export const getGithubRepos = username => async dispatch => {
    try {
        const response = await axios.get(`/api/profile/github/${username}`);
        console.log(response.data);
        dispatch({
            type: GET_REPOS,
            payload: response.data.data
        })
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

