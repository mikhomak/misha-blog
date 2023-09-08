import React from 'react';
import styles from './BlogShort.module.css';
import Likes from '../likes/likes';
import { Post } from '@/__generated__/graphql';
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

const BlogShort = ({ post }: { post: Post }) => {
  return (
    <div>
      <hr />
      <h3 className='m-0 mt-4'><Link href={`/blog/${post.id}`}>{post.title}</Link></h3>
      <p className='text-xs'>{post.createdAt}</p>
      <p>
        <ReactMarkdown>{post.text}</ReactMarkdown>
      </p>
      <div className='space-x-4 mb-6'>
        <Likes amountOfLikes={post.amountOfLikes || 0} postId={post.id}/>
        <Link href={`/blog/${post.id}`}>{post.amountOfComments} Comments</Link>
      </div>
    </div >
  );
};

export default BlogShort;
