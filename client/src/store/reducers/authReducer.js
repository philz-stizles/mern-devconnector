import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOADED_LOGGED_IN_USER, 
    AUTH_ERROR, 
    LOGOUT
} from './../types'

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loggedInUser: null,
    loading: true
};

const authReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            const { token, loggedInUser } = payload;
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token,
                isAuthenticated: true,
                loggedInUser,
                loading: false
            };
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loggedInUser: null,
                loading: false
            };
        
        case LOADED_LOGGED_IN_USER:
            return {
                ...state,
                isAuthenticated: true,
                loggedInUser: payload.loggedInUser,
                loading: false
            };

        default:
            return state;
    }
}

export default authReducer