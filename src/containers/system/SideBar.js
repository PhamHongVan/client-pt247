import React from 'react'
import anonAvatar from '../../assets/anon_avatar.jpg'
import { useSelector, useDispatch } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions'
import { IoLogOut } from "react-icons/io5";
import { blobToBase64 } from '../../ultils/Common/tobase64'

const activeStyle = 'hover:bg-[#ccc] flex  rounded-md items-center gap-2 py-2 font-bold bg-[#FDE9EC] '
const notActiceStyle = 'hover:bg-[#ccc] flex  rounded-md items-center gap-2 py-2 '

const SideBar = () => {

    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    return (
        <div className='w-[256px]   flex-none p-4 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={blobToBase64(currentData?.avatar) ||  anonAvatar} alt="avatar" className='w-14 h-14 object-cover rounded-full border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small className='text-[#6495ED]'>{currentData?.phone}</small>
                    </div>
                </div>
                <span >Mã thành viên: <span className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span></span>
            </div>
            <div className='cursor-pointer'>
                {menuSidebar.map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                            key={item.id}
                            to={item?.path}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}
                <span onClick={() => dispatch(actions.logout())} className={notActiceStyle}><IoLogOut />Thoát</span>
            </div>
        </div>
    )
}




export default SideBar