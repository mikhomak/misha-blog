import React from 'react';
import styles from './BlogShort.module.css';
import Likes from '../likes/likes';
import { Post } from '@/__generated__/graphql';
import ReactMarkdown from 'react-markdown'

const BlogShort = ({ post }: { post: Post }) => {
  return (
    <div>
      <hr />
      <h3 className='m-0 mt-4'><a href='/misha-blog/blog/1'>{post.title}</a></h3>
      <p className='text-xs'>{post.date}</p>
      <p>
        <ReactMarkdown>{post.text}</ReactMarkdown>
      </p>
      <div className='space-x-4 mb-6'>
        <Likes amountOfLikes={post.amountOfLikes} />
        <a href='/misha-blog/blog/1'>20 Comments</a>
      </div>
    </div>
  );
};

export default BlogShort;
