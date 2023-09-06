import React from 'react';
import styles from './Likes.module.css';

const Likes = ({ amountOfLikes }: { amountOfLikes: number }) => {
  return (
    <a href="/misha-blog/blog/1/like">{amountOfLikes} likes</a>
  );
};

export default Likes;
