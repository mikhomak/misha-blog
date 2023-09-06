import React from 'react';
import CommentComponent from '../comment/comment';
import { useCommentsContext } from '@/app/providers/comments-provider';

const CommentList = () => {
  const comments = useCommentsContext();
  return (
    <div>
      <h3>Comments:</h3>
      <div className='max-w-screen-md m-auto'>
        {comments.map((comment) => <CommentComponent key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default CommentList;
