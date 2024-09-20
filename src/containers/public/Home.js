import React from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import {Navigation, Search} from './index'
import { Intro, Contact } from '../../components'
import { path } from '../../ultils/constant'
import { useDispatch, useSelector} from 'react-redux'

const Home = () => {

    const {isLoggedIn} = useSelector(state => state.auth)
    const location = useLocation()
    
         return (
        <div className='w-full bg-primary flex gap-2 flex-col items-center h-full '>
            <Header />
            <Navigation />
           {isLoggedIn && location.pathname !== `/${path.CONTACT}` && !location.pathname?.includes( path.DETAIL) && <Search/>}
            <div className=' mw-4/5 lg:mw-3/5 flex flex-col items-start justify-start mt-3'>
            <Outlet />
            </div>
            <Intro/>
            <Contact/>
            <div className='h-[500px]'>

            </div>
        </div>
    )
}
export default Home