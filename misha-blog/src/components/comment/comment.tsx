import React from 'react';

const Comment = () => {
  return (
    <div className='my-2'>
      <p className='flex flex-col'>
        <span>Barack Obama</span>
        <span className='text-xs my-2'>02 02 2001</span>
      </p>
      <p>What a nice article</p>
      <hr/>
    </div>
  );
};

export default Comment;
