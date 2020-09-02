import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// DON'T FORGET TO ADD EACH OF THESE METHODS TO THE VALUE ATTRIBUTE OF THE RETURNED CONTEXT PROVIDER BELOW!
	// Load User
	const loadUser = () => console.log('loaduser');

	// Register User
	const register = async (formData) => {
		// Axios lets you include header information to be sent to the server handling the request. Here we are telling MongoDB that the content we are sending will be json data.
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Since we are waiting for a response, a try catch will be used.
		try {
			// Remember we have the proxy value(http://localhost:5000) in the package.json that will precede the /api/users. If that proxy is not configured you will need to write the entire web address in the post action.
			const res = await axios.post('/api/users', formData, config);

			// With a successful post/response cycle we can now dispatch the token(res.data) as the payload. You can see how this request is handled on the backend in routes/users.js.
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Login User
	const loginUser = () => console.log('user login');

	// Logout
	const logoutUser = () => console.log('user logout');

	// Clear Errors
	const clearErrors = () => {		
	// console.log('clear errors');
	dispatch({ CLEAR_ERRORS });
	};
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				register,
				loginUser,
				logoutUser,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
