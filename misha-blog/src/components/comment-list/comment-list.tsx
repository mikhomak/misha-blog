import React from 'react';
import Comment from '@/components/comment/comment';

const CommentList = () => {
  return (
    <div>
      <h3>Comments:</h3>
      <div className='max-w-screen-md m-auto'>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default CommentList;
