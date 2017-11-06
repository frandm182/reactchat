import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => (
  <div id="Header">
    <img src="/assets/icon.png" alt="logo" />
    <h1>ReactChat</h1>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.node
};

export default Header;
