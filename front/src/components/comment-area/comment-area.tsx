"use client"

import React, { useContext, useState } from 'react';
import CommentList from '../comment-list/comment-list';
import CommentForm from '../comment-form/comment-form';
import { CommentsProvider, useCommentsContext } from '@/app/providers/comments-provider';
import { Comment } from '@/__generated__/graphql';


const CommentArea = ({ comments }: { comments: Comment[] }) => {


  return (
    <CommentsProvider comments={comments}>
      <CommentList/>
      <CommentForm />
    </CommentsProvider>
  );
};

export default CommentArea;
