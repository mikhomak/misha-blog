"use client"

import React from 'react';
import CommentList from '../comment-list/comment-list';
import CommentForm from '../comment-form/comment-form';
import { CommentsProvider } from '@/providers/comments-provider';
import { Comment } from '@/__generated__/graphql';


const CommentArea = ({ comments, postId }: { comments: Comment[], postId: string }) => {


  return (
    <CommentsProvider comments={comments}>
      <CommentList />
      <CommentForm postId={postId} />
    </CommentsProvider>
  );
};

export default CommentArea;
