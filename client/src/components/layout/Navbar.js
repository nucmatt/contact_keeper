import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Navbar is a functional component with two props: title and icon. Using the object notation you are destructuring the props so you don't have to add any other nomenclature when using the prop outside the name.
export const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                {/* Here we added the props from above. Their values are either passed to the Navbar component from the parent component(App.js here) or are the defaults as set below. */}
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </div>
    )
}

// use PropTypes (imported above) for type checking your properies. You can also set properties to required for error checking (done with title).
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

// You can set your properties (listed above when creating the component) to have default settings using .defaultProps.
Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}
export default Navbar
