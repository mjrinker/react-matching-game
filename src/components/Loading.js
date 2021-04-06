import React from 'react';

const Loading = ({ message }) => (
  <div className='loader'>
    <div className='loader-grid'>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <div>{message}</div>
  </div>
);

export default Loading;
