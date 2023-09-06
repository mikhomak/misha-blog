import { Comment } from '@/__generated__/graphql';
import React from 'react';

const CommentComponent = ({comment} : {comment : Comment}) => {
  return (
    <div className='my-2'>
      <p className='flex flex-col'>
        <span>{comment.author}</span>
        <span className='text-xs my-2'>{comment.date}</span>
      </p>
      <p>{comment.text}</p>
      <hr/>
    </div>
  );
};

export default CommentComponent;
