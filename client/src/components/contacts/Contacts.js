import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
	// This brings in the contactContext (Context API usage here!) which gives this Contacts component access to the ContactContext's state values.
	const contactContext = useContext(ContactContext);

	const { contacts } = contactContext;

	return (
		<Fragment>
			{contacts.map((contact) => (
				<ContactItem key={contact.id} contact={contact} />
			))}
		</Fragment>
	);
};

// Since these contacts are user specific, this component will be brought in to the Home page.
export default Contacts;
