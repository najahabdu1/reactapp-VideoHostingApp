import React from 'react';
import { useState } from 'react';
import {NextPage} from 'next';
import { useRouter } from "next/router";
import Link from 'next/link';
//import GoogleLogin from 'react-google-login';
import { AiFillHome,AiOutlineMenu } from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover';
import SuggestAccounts from './SuggestAccounts';
import Footer from './Footer';
import useAuthStore from '../../store/authStore';
export const Sidebar = () => {
  const [showSidebar, setshowSidebar]= useState(true);
  const normalLink ="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const {userProfile ,addUser, removeUser} =useAuthStore();
  return (
    <div>
      <div
      className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      onClick={() => setshowSidebar((prev)=> !(prev))}>
        {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu/>}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-grey-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-grey-200 xl:pb-4'>


            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome/>
                </p>
                <span  className='text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          {userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text=grey-400'>Welcome Back , {userProfile.userName}</p>
            
            </div>
          )}
          <Discover />
          <SuggestAccounts />
          <Footer />
          </div>
      )}
    </div>
  )
}
export default Sidebar;