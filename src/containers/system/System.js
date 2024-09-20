import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Header,SideBar } from './'

const System = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
   if (!isLoggedIn) return  <Navigate to={`/${path.LOGIN}`} replace={true}/>
   return (
    <div className='w-full h-screen flex flex-col items-center'>
        <Header/>
        <div className='w-full h-screen   flex flex-auto'>
            <SideBar/>
            <div className='w-full bg-[#FFF] shadow-md flex-auto h-[100%] p-4 overflow-y-scroll'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
  
}

export default System