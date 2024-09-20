import React from 'react'
import { Navigation } from '../public'

const Header = () => {
  return (
    <div className='w-full flex-none flex h-[40px]'>
        <div className='flex justify-center items-center font-bold bg-secondary1 text-white   w-[256px] flex-none'>
            Phongtro247.com
        </div>
        <div className=' w-full flex-auto'>
        <Navigation isAdmin={true}/>
        </div>
    </div>
  )
}

export default Header