import React from 'react';
import styles from './navbar.module.css';


const Navbar = () => {
  return (
    <p className='space-x-2'>
      <a href='/misha-blog/'>blogs</a>
      <a href='/misha-blog/about'>about</a>
      <a href='/misha-blog/contact'>contact</a>
    </p>
  );
};

export default Navbar;
