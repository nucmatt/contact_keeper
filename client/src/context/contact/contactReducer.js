import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		// For all these actions, remember that state is immutable. It cannot be changed directly, it must be added to or subtracted from after being copied, hence the spread operators for each state update.
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payload],
            };
        case DELETE_CONTACT:
            return {
                ...state,
                // The filter array method will return a new array with all contacts that DO NOT match the passed in id(id is held in action.payload).
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
		default:
			return state;
	}
};
