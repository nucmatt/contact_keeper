import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactFilter = () => {
    const contactContext = useContext(ContactContext);

    // useRef is a hook that lets you store a mutable value between rerenders. Basically useRef creates a plain JavaScript object with several properties. This object does not change with rerenders, it only changes with inputs. Here useRef will store the filter text to filter through a user's contacts.
    const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = e => {
        // current is a property of useRef that stores the currently entered value for what is referenced. Here is it the variable text.
        if(text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}

export default ContactFilter;
