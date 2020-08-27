// useState (from React Hooks) is brought in here to handle the form inputs. Remember that each input field needs its own state and callback function to work properly in React. useContext is another hook brought in to deal with updating state via context.
import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {
	// Here we are giving the form access to use the methods and state contained in contactContext.
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, clearCurrent, current } = contactContext;

	// useEffect is a hook that triggers actions only after a render cycle is complete (i.e. the browser paints the screen for the user). This hook is guaranteed to fire before another render is started.
	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
		// This array is for dependencies of the useEffect hook's action. This allows you to trigger the useEffect function only after certain props/state values have changed. Here we only want to fill in the contact form if the current state value changes AND we want to clear the form after any other change to contactContext. Else you will have some values stick around in the form fields after certain rerenders.
	}, [contactContext, current]);

	// Here we create a state variable contact, and set its update function to setContact (from the contactReducer).
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	// Destructure the contact state object.
	const { name, email, phone, type } = contact;

	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		// prevent the default submission behavior when user clicks the submit button.
		e.preventDefault();
		if (current === null) {
			// The submit button now calls the addContact method from contactContext and passes it the new contact state object held within the form.
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
		// once the new contact object is passed off for updating the database we want to reset the form to default values. Could there be a cleaner way to do this rather than having to reinput the entire default state object values? Now changed to clearAll function above.
		// setContact({
		// 	name: '',
		// 	email: '',
		// 	phone: '',
		// 	type: 'personal',
		// });
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Edit Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				name='name'
				placeholder='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='text'
				name='email'
				placeholder='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				name='phone'
				placeholder='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal{' '}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
