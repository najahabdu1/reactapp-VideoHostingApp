import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
//import { GoogleLogin,GoogleLogout } from 'react-google-login';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/tiktik-logo.png';

export const Navbar = () => {
  return (
    <div className='w-fullflex judtify-between items-center border-b-2 border-gray-200 py-2 px-4'>
        <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
            <Image
            className='cursor-pointer' src={Logo}
            alt="TikTik"
            layout='responsive'
            objectFit="contain"
            />
        </div>
        </Link>
    </div>
  )
}

export default Navbar;