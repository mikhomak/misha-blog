import React from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';


const Navbar = () => {
  return (
    <p className='space-x-2'>
      <Link href='/'>blogs</Link>
      <Link href='/about'>about</Link>
      <Link href='/contact'>contact</Link>
    </p>
  );
};

export default Navbar;
