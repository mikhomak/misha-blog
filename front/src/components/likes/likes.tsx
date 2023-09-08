import React from 'react';
import styles from './Likes.module.css';
import Link from 'next/link';

const Likes = ({ amountOfLikes }: { amountOfLikes: number }) => {
  return (
    <Link href="/blog/1/like">{amountOfLikes} likes</Link>
  );
};

export default Likes;
