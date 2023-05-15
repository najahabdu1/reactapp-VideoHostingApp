import React from 'react'
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md';

const NoVideos = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
    <p className='text-xl'>
    No Videos yet
      <MdOutlineVideocamOff className='text-gray-400 justify-center'/>
    </p>
  </div>
);
}

export default NoVideos