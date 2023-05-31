import React from 'react';
import {useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/tiktik-logo.png';
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import { error } from 'console';
import { Route} from "react-router-dom";
import { createOrGetUser } from '@component/utils';
import useAuthStore from '../../store/authStore';
import pload from '@component/pages/upload';
import { IUser } from '../../types';


export const Navbar = () => {
  //const [isHover,setIsHover]= useState(false);
  const [user, setUser] = useState<IUser | null>();
  const {userProfile, addUser, removeUser} =useAuthStore();
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);


  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-1'>
        <Link href='/'>
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
            <Image
            className='cursor-pointer' src={Logo}
            alt="TikTik"
            layout='responsive'
            objectFit="contain"
            /> 
        </div>
        </Link>
        <div className='relative hidden md:block'>
          <form
            onSubmit={handleSearch} className='absolute md:static top-10 -left-20 bg-white'>
              <input 
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
               placeholder='Search accounts and videos'/>
                 <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
            <BiSearch />
          </button>

            
          </form>
        </div>
        <div>
          {userProfile ? (

            <div className='w-full flex gap-6 justify-between items-center py-1 px-1'>
                <Link href='/upload'>
                <div className="flex items-center justify-center bg-grey-lighter">
                <label className="w-20  flex flex-col items-center px-1 py-2 bg-red-100 text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                 <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="text-center text-gray-500">Upload</span>
                <input type='file' className="hidden" />
            </label>
            </div>
            
                </Link>
                {userProfile.image && (
                 <Link href='/'>
                 <>
                 <Image
                      width={2}
                      height={2}
                     className='rounded-full scale-75 hover:scale-90'
                     src={userProfile.image} 
                     alt={userProfile.userName}
                     layout="responsive" />
                     
                     </>
               </Link>
                )}
               <p>Hi, {userProfile.userName}</p>
                
                <button type='button' className='px-2' onClick={() => {
                  googleLogout();
                  removeUser();
                }}>
                  <AiOutlineLogout color='brown' fontSize={21} className='scale-100 hover:scale-110' />
                </button>
            </div>
          ):(
            <GoogleLogin 
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('error')}/>
          )}
        </div>
    </div>
  )
}
export default Navbar;