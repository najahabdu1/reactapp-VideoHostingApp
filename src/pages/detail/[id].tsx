import React from 'react';
import { useState,useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp,HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import {URL} from '../../utils';
import { Video } from '../../../types';

interface IProps {
  postDetails: Video,
}

const Detail = ({postDetails}: IProps) => {
  const [post, setpost] = useState(postDetails);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted ,setIsVideoMuted] = useState(false);
  const VideoRef = useRef<HTMLVideoElement>(null);
  const router= useRouter();
  const onvideoClick = ()=>{
    if(playing){
      VideoRef?.current?.pause();
      setplaying(false);
    } else {
      VideoRef?.current?.play();
      setplaying(true);
    }
  }
  useEffect (()=>{
    if(post && VideoRef?.current){
      VideoRef.current.muted = isVideoMuted;
    }

   },[post, isVideoMuted])
  if(!post) return null;
  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[500px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={()=> router.back()}>
            <MdOutlineCancel className='text-white text-[30px]'/>
          </p>
          </div>
          <div className='relative'>
            <div className='lg:h-[100vh]'>
              <video loop ref={VideoRef} className='object-cover h-full w-full cursor-pointer' src = {post.video.asset.url}
              onClick={onvideoClick}>
              </video>
          </div>
          <div className='absolute top-[40%] left-[40%]'>
              {!playing &&(
                <button className='text-white text-6xl lg:text-8xl cursor-pointer'
                onClick={onvideoClick}>
                  <BsFillPlayFill/>
                </button>
              )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
        {isVideoMuted ?(
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className='text-white text-3xl lg:text-4xl'/>
              </button>
            ): (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className= "text-white text-3xl lg:text-4xl"/>
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: {id}
}:{
    params:{id: string}
  
}) => {
  const {data} = await axios.get(`${URL}/api/post/${id}`);
  return {
    props: {postDetails :data}
  }
}

export default Detail;