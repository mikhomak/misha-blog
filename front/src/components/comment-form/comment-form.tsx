import { useCommentsUpdateContext } from '@/app/providers/comments-provider';
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';


const ADD_COMMENT = gql`mutation AddComment($commentInput: CommentInput) {
  addComment(commentInput: $commentInput) {
    author
    date
    text
  }
}`

const CommentForm = () => {
  const commentsUdapte = useCommentsUpdateContext();


  const [addComment, { data }] = useMutation(ADD_COMMENT, {
    onCompleted: (data) => {
      console.log(data.addComment);
      commentsUdapte(data.addComment);
    }
  });


  return (
    <div className='max-w-screen-md m-auto'>
      <h3>Write something:</h3>
      <form onSubmit={e => {
        e.preventDefault();
        addComment({
          variables: {
            commentInput: {
              author: (e.currentTarget.elements.namedItem('author') as RadioNodeList).value,
              date: new Date().toString(),
              postId: "1",
              text: (e.currentTarget.elements.namedItem('text') as RadioNodeList).value
            }
          }
        })
      }
      }>
        <div className='flex flex-col'>
          <input type='text' name='author' className='max-w-min' placeholder='Your name' />
          <textarea name='text' placeholder='Damn bruh this shit is fire no cap' className='my-2' />
          <button className='my-2 max-w-min' >Submit</button>
        </div>
      </form>
    </div >
  );
};

export default CommentForm;
