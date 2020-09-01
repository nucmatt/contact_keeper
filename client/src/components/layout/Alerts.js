import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alerts = () => {
	const alertContext = useContext(AlertContext);

	return (
        // The return utilizes a 'short-circuit AND operator', &&. What this does is return the result of the AND expression as false (i.e. returns null) if the first variable is false, WITHOUT evaluating the second variable. An alternative to this method is to use a ternary operator that returns null if length is 0.
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
		))
	);
};

export default Alerts;
