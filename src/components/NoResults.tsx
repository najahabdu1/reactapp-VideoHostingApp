import React from 'react';
import { MdOutlineVideocamOff} from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';


export const NoResults = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-5xl'>
        No comments yet
        <BiCommentX/>
       
      </p>
      <p className='text-2xl text-gray-400 text-center'>No Comments yet</p>
    </div>
  );
};

export default NoResults;
