"use client"

import React from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_LIKE = gql`mutation Like($postId: ID) {
  like(postId: $postId) {
    likes
  }
}`

const Likes = ({ amountOfLikes, postId }: { amountOfLikes: number, postId: string }) => {
  const [likePost, { data }] = useMutation(ADD_LIKE, {
    variables: {
      "postId": postId
    }
  })
  return (
    <button onClick={() => likePost()} disabled={data}>{data === undefined? amountOfLikes : data.like.likes} likes</button>
  );
};

export default Likes;
