import React from 'react';

const Loader = () => {
  return (
    <div className='flex inline-block justify-center align-center'>
      <div className='loader'></div>
      <span className='ml-[0.5rem]'>Loading</span>
    </div>
  );
}

export default Loader;
