import React from 'react';
import { MdOutlineVideocamOff} from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
interface IProps {
  text: string;
}

export const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text === 'No comments yet' ? <BiCommentX/>
        : 
        
        <MdOutlineVideocamOff className='text-gray-400'/>}
      </p>
      <p className='text-2xl text-gray-400 text-center'>No Comments yet</p>
    </div>
  );
};

export default NoResults;
