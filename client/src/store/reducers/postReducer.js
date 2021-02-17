import { 
   GET_POSTS,
   POSTS_ERROR
} from '../types'

const initialState = {
    posts: [],
    loading: true,
    error: null
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        
        case POSTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
}

export default profileReducer