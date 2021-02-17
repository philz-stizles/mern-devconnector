import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOADED_LOGGED_IN_USER, 
    AUTH_ERROR,
    LOGOUT,
    CLEAR_PROFILE
} from './../types';
import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../../utils/axios-util';


export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        const response = await axios.post('/api/users', body, config);
        console.log(response.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data.data
        })
        dispatch(loadLoggedInUser())
        dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response.data.data);
        const errors = error.response.data.data;
        if(errors) {
            errors.forEach(error => dispatch(setAlert('danger', error.msg)));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const response = await axios.post('/api/auth/login', body, config);
        console.log(response.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data
        })
        dispatch(loadLoggedInUser())
        dispatch(setAlert('success', response.data.message))
    } catch (error) {
        console.log(error.response.data.data);
        const errors = error.response.data.data;
        if(errors) {
            errors.forEach(error => dispatch(setAlert('danger', error.msg)));
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const loadLoggedInUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    if(token) {
        setAuthToken(token);
    }

    try {
        const response = await axios.get('/api/auth/getLoggedInUser');
        console.log(response.data);
        dispatch({
            type: LOADED_LOGGED_IN_USER,
            payload: {
                loggedInUser: response.data.data
            }
        })
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logOut = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
}