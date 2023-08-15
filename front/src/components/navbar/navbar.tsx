import React from 'react';
import styles from './navbar.module.css';


const Navbar = () => {
  return (
    <p className='space-x-2'>
      <a href='/'>blogs</a>
      <a href='/about'>about</a>
      <a href='/contact'>contact</a>
    </p>
  );
};

export default Navbar;
