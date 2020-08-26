import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
	// initialState will eventually equal an empty array of contacts, to be filled from the user's database. For now we are using hardcoded contacts for initial buildout.
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jill Johnson',
				email: 'jill@gmail.com',
				phone: '111-111-1111',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Sara Watson',
				email: 'sara@gmail.com',
				phone: '222-222-2222',
				type: 'personal',
			},
			{
				id: 3,
				name: 'Harry White',
				email: 'harry@gmail.com',
				phone: '333-333-3333',
				type: 'professional',
			},
		],
		// This piece of state will hold the contact that is currently being edited in the UI.
		current: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// state update methods
	// Note that each of these methods needs to be added to the returned providers value attribute below. The value attribute is what gives each child component access of the Provider access to the Provider's methods.
	// Add Contact
	const addContact = (contact) => {
		// using uuid here to generate a random key value for use in updating the UI. Once the UI is connected to the database, JWT will assign the contact a random id.
		contact.id = uuidv4();
		// Remember the dispatch method makes a call the the reducer WITH a payload attached so the reducer can perform the correct action to update the app's state.
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete Contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		// No payload required here. This method just sets the current state back to null.
		dispatch({ type: CLEAR_CURRENT });
	};

	// Update Contact

	// Filter Contacts

	// Clear Filter

	// In the return statement below, props.children will become any component that is rendered within the <ContactState> component. This makes it so that all those children will have access to the state of the ContactState component since it is a Context API Provider. In other words, the child components subscribe to the ContactState component's state and will update/rerender themselves whenever ContactState has it's state updated.
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
