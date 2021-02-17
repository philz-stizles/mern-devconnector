import { SET_ALERT, REMOVE_ALERT } from './../types'
import { v4 as uuidv4 } from 'uuid'

export const setAlert = (type, msg, timeout = 5000) => dispatch => {
    const id = uuidv4();

    dispatch({
        type: SET_ALERT,
        payload: { id, type, msg }
    });

    setTimeout(() => {
        dispatch(removeAlert(id));
    }, timeout);
}

export const removeAlert = (id) => {
    return {
        type: REMOVE_ALERT,
        payload: id
    }
};