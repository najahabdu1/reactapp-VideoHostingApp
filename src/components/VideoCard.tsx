import React from 'react';
import { useState,useEffect,useRef } from 'react';
import { NextPage } from 'next';
import { Video } from '../../types';
import Image from 'next/image';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import Link from 'next/link';
import { BsPlay,BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';

interface IProps{
  post: Video;
}

const VideoCard: NextPage<IProps> = ({post}) => {
  const [isHover, setIsHover] = useState (false);
  const [playing ,setPlaying] = useState(false);
  const [isVideoMuted ,setIsVideoMuted] = useState(false);
  const VideoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if(playing){
      VideoRef?.current?.pause();
      setPlaying(false);
    }
      else {
      VideoRef?.current?.play();
      setPlaying(true);
      
    }
   useEffect (()=>{
    if(VideoRef?.current){
      VideoRef.current.muted = isVideoMuted;
    }

   },[isVideoMuted])
  }
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
        <div className='md:w-16 md:h-16 w-10 h-10'>
          <Link href={'/'}>
            <>
            <Image 
                width={62}
                height={62}
                className='rounded-full'
                src={post.postedBy.image} 
                alt="Profile Pic"
                layout="responsive" />
                
                </>
          </Link>
        </div>
        <div>
          <Link href={'/'}>
            <div className='flex gap-2 items-center gap-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} {' '}
              <GoVerified className='text-blue-400 text-md' />
              </p>
              {/* <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p> */}
            </div>
          </Link>
        </div>
      </div>
      <div className='lg:ml-20 flex flex-col gap-4 relative'>
        <div className=' flex flex-col rounded-3xl space-y-[5px] gap-3'
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={() =>setIsHover(false)}>
          <Link href={`/detail/${post._id}`}>
          <p className="mt-4"> {post.caption}</p>
            <video 
            loop
            ref={VideoRef}
            className=' flex flex-col lg:w-[550px] h-[350px] md:h-[450px] lg:h-[450px] w-[270px] rounded-2xl cursor-pointer bg-gray-100'
            src={post.video.asset.url}>
            </video>
          </Link>
          {isHover && 
          <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:right-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
            {playing ?(
              <button onClick={onVideoPress}>
                <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
              </button>
            ): (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className= "text-black text-2xl lg:text-4xl"/>
              </button>
            )}
            {isVideoMuted ?(
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className='text-black text-2xl lg:text-4xl'/>
              </button>
            ): (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className= "text-black text-2xl lg:text-4xl"/>
              </button>
            )}
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default VideoCard;