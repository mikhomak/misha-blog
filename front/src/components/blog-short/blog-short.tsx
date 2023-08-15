import React from 'react';
import styles from './BlogShort.module.css';
import Likes from '../likes/likes';


const BlogShort = () => {
  return (
    <div>
      <hr/>
      <h3 className='m-0 mt-4'><a href='/misha-blog/blog/1'>Title</a></h3>
      <p className='text-xs'>20 02 1990</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet ex ante, et gravida nulla elementum eget. Sed eu neque non purus auctor sodales. Vestibulum consequat diam sed sagittis suscipit. Nullam id cursus neque. Nam magna quam, cursus non pellentesque nec, interdum ut felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam a malesuada augue. Nulla condimentum at arcu ac pharetra. Mauris consequat in lectus elementum commodo.
      </p>
      <div className='space-x-4 mb-6'>
        <Likes />
        <a href='/misha-blog/blog/1'>20 Comments</a>
      </div>
    </div>
  );
};

export default BlogShort;
