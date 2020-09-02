import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
	// Bring in the contexts used so we can access those methods.
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	// pull out the methods you want to use from the imported contexts. You don't have to destructure them like this but Traversy does it and I think I like the look of this code.
	const { setAlert } = alertContext;
	const { register, error, clearErrors } = authContext;

	useEffect(() => {
		// An alternative for error checking, esp for large projects, it to assign each error type a unique(but not changing) identifier and match the identifier, not the string.
		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// Remember you can add a dependency to useEffect so that it only runs when there is a change to a specific piece of state, hence the , [error] added here.
	}, [error]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = user;

	const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		// You don't necessarily need these alerts. You can simply set the input fields in the form to required and the browser will handle the alerts. Note that the required attribute will take precedence and your alerts will not display, so both is an option if you want multiple lines of defense against bad entries.
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			// console.log('Register Submit');
			// The register method is expecting form data in the form of an object so we include the user's data as an object.
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primart'>Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={onChange}
						required
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
