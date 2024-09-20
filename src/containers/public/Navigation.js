import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { formatVietnamToString } from "../../ultils/Common/FormatVietnamToString"
import { useDispatch , useSelector} from "react-redux"
import * as actions from '../../store/actions'
import  {path} from '../../ultils/constant'

const notActive = 'hover:bg-secondary2 p-4 h-full  flex items-center  bg-secondary1'
const active = 'hover:bg-secondary2 bg-secondary2 p-4 h-full flex items-center bg-secondary2'
const Navigation = ({isAdmin}) => {

    // const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const {categories} = useSelector(state=> state.app)
    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])


    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px]  bg-secondary1 text-[white]`}>
            <div className="max-3/5 flex h-full items-center text-sm font-medium ">
                <NavLink to=
                    {`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className="flex h-full justify-center items-center" >
                            <NavLink to=
                                {`/${formatVietnamToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
                <NavLink to=
                    {path.CONTACT}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                   Liên hệ
                </NavLink>
            </div>
        </div>
    )
}
export default Navigation