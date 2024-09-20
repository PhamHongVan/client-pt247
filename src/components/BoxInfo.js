import React, { memo } from 'react'
import anonAvatar from '../assets/anon_avatar.jpg'
import icons from '../ultils/icons'

const {GoDotFill,FaPhone,SiZalo} = icons

const BoxInfo = ({userData}) => {
  return (
    <div className='w-full bg-[#FFB6C1] rounded-md flex flex-col items-center p-4 gap-4'>
    <img src={anonAvatar} alt='avatar' className='w-16 h-16 object-contain rounded-full'/>
    <h3 className='font-medium  text-xl'>{userData?.name}</h3>
    <span className='flex items-center'>
        <GoDotFill color='green'  size={18}/>
        <span>Đang hoạt động</span>
    </span>
    <a className='bg-[#6495ED] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' href='/'>
        <FaPhone/>{userData?.phone}
    </a>
    <a className='bg-[#FFF] py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg' href={`https://zalo.me/${userData?.zalo}`} target='_blank'>
        <SiZalo color='#6495ED' size={22}/>Nhắn Zalo
    </a>
    </div>
  )
}

export default memo(BoxInfo)