import React, {useCallback, useEffect, useRef, useState} from 'react'
import logo from '../../assets/logo.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons';
import {useNavigate, Link, useSearchParams} from 'react-router-dom'
import {path} from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage';

const {CiCirclePlus,IoLogOut,FaAngleDown} = icons
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParam] = useSearchParams()
    const headerRef = useRef()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [isShowMenu, setisShowMenu] = useState(false)

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, {state:{flag} })
    },[])
    useEffect(()=>{
        headerRef.current.scrollIntoView({behavior:'smooth', block:'start'})
    },[searchParam.get('page')])
    return (
        <div ref={headerRef} className='w-3/5'>
    <div className='w-auto flex items-center justify-between h-[80px]' >
            <Link to = {'/'}>
            <img
            src = {logo}
            alt = "logo"
            className='w-[360px] h-[100px] object-cover mt-10 '
            /></Link>
            <div className='flex items-center gap-1 '>
       
        {!isLoggedIn && <div className='flex items-center gap-1 '>       
        <small>Phongtro247 xin chào!</small>
        <Button  text={'Đăng nhập'} textColor='text-white' bgColor='bg-secondary1'
        onClick = {() => goLogin(false)}
        />
        <Button text={'Đăng ký'} textColor='text-white' bgColor='bg-secondary1'
                onClick = {() => goLogin(true)}
        />
         </div>
        }

     {isLoggedIn && <div className='flex items-center gap-3 relative'>       
        <User/>
        <Button text={'Quản lí tài khoản'}
         textColor='text-white' 
         bgColor='bg-secondary1'
         px= 'px-4'
         IcAfter={FaAngleDown}
         onClick={() => setisShowMenu(prev => !prev)}
        />
       {isShowMenu &&  <div className='absolute border shadow-md rounded-md min-w-200 bg-[#FFF] right-0 top-full pl-4 p-2 flex flex-col '>
           {menuManage.map(item => {
            return(
                <Link className='hover:text-[#FF0000] flex items-center gap-2 text-[#6495ED] border-b border-gray-300 py-2'  key={item.id} to={item?.path}>
                    {item.icon}
                    {item.text}
                </Link>
            )
           })}
           <span  className='cursor-pointer hover:text-[#FF0000] text-[#6495ED] flex items-center gap-2 py-2'  
            onClick = {() => {
                setisShowMenu(false)
                dispatch(actions.logout())
            }}>
            <IoLogOut/>
            Đăng xuất
           </span>
        </div>}

         </div>
        }
         
        <Button text={'Đăng tin mới'} 
        textColor='text-white' 
        bgColor='bg-secondary2' 
        IcAfter ={CiCirclePlus}
        onClick = {() => navigate('/he-thong/tao-moi-bai-dang')}
        />
        </div>

        </div>
        </div>
    )
}
export default Header