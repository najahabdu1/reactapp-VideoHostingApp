import React from 'react';

import { useState } from 'react';
import {NextPage} from 'next';
import { useRouter } from "next/router";
import Link from 'next/link';
import { AiFillHome,AiOutlineMenu } from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover';
import SuggestAccounts from './SuggestAccounts';
import Footer from './Footer';
import useAuthStore from '../../store/authStore';

export const Sidebar = () => {
  const [showSidebar, setshowSidebar]= useState(true);
  const normalLink ="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const {userProfile ,addUser, removeUser}: any =useAuthStore();
  return (
    <div>
      <div
      className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      onClick={() => setshowSidebar((prev)=> !(prev))}>
        {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu/>}
      </div>
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-grey-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-grey-200 xl:pb-4'>


            <Link href='/upload'>
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome/>
                </p>
                <span  className='text-xl hidden xl:block'>
                 {userProfile && (
                    <div>For You, {userProfile.userName}</div>
                    
                 )}
                  
                </span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestAccounts />
          <Footer />
          </div>
    </div>
  )
}
export default Sidebar;