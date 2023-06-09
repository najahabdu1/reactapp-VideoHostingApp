import React from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import {useState, useEffect} from 'react';
import axios from 'axios';

import VideoCard from '@component/components/VideoCard';
import NoResults from '@component/components/NoResults';
import {IUser,Video} from '../../../types';
import NoVideos from '@component/components/NoVideos';

interface IProps {
  data:{
    user: IUser
    userVideos: Video[],
    userLikedVideos: Video[],
  }
}

 const Profile = ({data}:IProps) => {
  const [showUserVideos, setshowUserVideos] = useState(true);
  const [videoList, setvideoList] = useState<Video[]>([]);
  const videos = showUserVideos ? 'border-b-2 border-black':'text-gray-400';
  const liked = showUserVideos ? 'text-gray-400':'border-b-2 border-black';
  const {user, userLikedVideos, userVideos} = data;

  useEffect(() => {
    if(showUserVideos){
      setvideoList(userVideos);
    } else {
      setvideoList(userLikedVideos)
    }
  
  },[showUserVideos,userLikedVideos,userVideos]);
  
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-xl'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className=' text-gray-500 text-sm font-medium'> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setshowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setshowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videoList.length > 0 ? (
            videoList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoVideos/>
          )}
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps =async ({params:{id}}:{params:{id: string}}) => {
const res= await axios.get(`http://localhost:3000/api/profile/${id}`);
return{
  props: {data: res.data}
}
}
export default Profile;