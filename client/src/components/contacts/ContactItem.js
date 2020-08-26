import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

export const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;

	// destructuring the contact object passed in as a prop
	const { id, name, email, phone, type } = contact;

	const onDelete = () => {
		// Remember you have access to the contact's id property from the above property (destructured above).
        deleteContact(id);
        // One a delete action we also want to set the current state back to null so we call clearCurrent.
        clearCurrent();
	};
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(type === 'professional' ? 'badge-success' : 'badge-primary')
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{email && (
					<li>
						{' '}
						<i className='fas fa-envelope-open'></i> {email}{' '}
					</li>
				)}
				{phone && (
					<li>
						{' '}
						<i className='fas fa-phone'></i> {phone}{' '}
					</li>
				)}
			</ul>
			<p>
				<button
					className='btn btn-dark btn-sm'
					onClick={() =>
						// here we don't need a method for onClick, we can just call setCurrent directly and pass in the contact prop (from the funtional component this return statement is a part of.)
						setCurrent(contact)
					}
				>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItem;
