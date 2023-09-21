import { useCommentsUpdateContext } from '@/providers/comments-provider';
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';


const ADD_COMMENT = gql`mutation AddComment($commentInput: CommentInput) {
  addComment(commentInput: $commentInput) {
    comments{
      author
      createdAt
      text
    }
  }
}`

const CommentForm = ({ postId }: { postId: string }) => {
  const commentsUdapte = useCommentsUpdateContext();
  const [addComment, { data,loading }] = useMutation(ADD_COMMENT, {
    onCompleted: (data) => {
      commentsUdapte(data.addComment.comments);
    }
  });

  if (loading) {
    return (<>Loading...</>)
  }


  return (
    <div className='max-w-screen-md m-auto'>
      <h3>Write something:</h3>
      <form onSubmit={e => {
        e.preventDefault();
        addComment({
          variables: {
            commentInput: {
              author: (e.currentTarget.elements.namedItem('author') as RadioNodeList).value,
              postId: postId,
              text: (e.currentTarget.elements.namedItem('text') as RadioNodeList).value
            }
          }
        })
      }
      }>
        <div className='flex flex-col'>
          <input type='text' name='author' className='max-w-min' placeholder='Your name(max 50 chars)' max={50}/>
          <textarea name='text' placeholder='Damn bruh this shit is fire no cap(max 500 char)... I also support markdown' className='my-2' maxLength={500} />
          <button className='my-2 max-w-min' >Submit</button>
        </div>
      </form>
    </div >
  );
};

export default CommentForm;
