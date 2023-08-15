import React from 'react';

const CommentForm = () => {
  return (
    <div className='max-w-screen-md m-auto'>
      <h3>Write something:</h3>
      <div className='flex flex-col'>
        <input type='text' className='max-w-min' placeholder='Your name'/>
        <textarea placeholder='Damn bruh this shit is fire no cap' className='my-2'/>
        <button className='my-2 max-w-min'>Submit</button>
      </div>
    </div>
  );
};

export default CommentForm;
