import { Comment } from '@/__generated__/graphql';
import moment from 'moment';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const CommentComponent = ({ comment }: { comment: Comment }) => {
  return (
    <div className='my-2'>
      <p className='flex flex-col'>
        <b>{comment.author}</b>
        <i className='text-xs my-2'>{moment(comment.createdAt).format("DD MM YYYY hh:mm:ss")}</i>
      </p>
      <ReactMarkdown>{comment.text}</ReactMarkdown>
      <hr />
    </div>
  );
};

export default CommentComponent;
