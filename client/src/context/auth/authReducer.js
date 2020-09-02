import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				// Remember the order of destructuring assignment here. First we bring the state in, then each value of state is set in order OR by it's property name. Probably best to always put everything in order as it appears in the state object.
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
			// On a registration fail we always want to remove data from localStorage, reset the AuthState state, and then return the errors received in the payload from users.js.
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: true,
				user: null,
				error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
		default:
			return state;
	}
};
