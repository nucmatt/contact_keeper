import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			// We are returning an array for the alerts because the AlertState is an array of alerts that we iterate through. This allows for displaying multiple alerts at once rather easily.
			return [...state, action.payload];
		case REMOVE_ALERT:
            // Since state is an array, we can use the filter array method to return a new array of state without the alert that has been cleared.
			return state.filter((alert) => alert.id !== action.payload);
		default:
			return state;
	}
};
