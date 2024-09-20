import React, { memo } from 'react'
import { text } from '../ultils/dataIntro'
import icons from '../ultils/icons'
import {Button} from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatVietnamToString } from '../ultils/Common/FormatVietnamToString'

const {MdStar} = icons
const star = [1,2,3,4,5]


const Intro = () => {
    const {categories} = useSelector(state=> state.app)
    
  return (
    <div className='border gap-4 w-[1100px] bg-[#FFF] rounded-md shadow-md p-4 flex flex-col items-center justify-center'>
        <h3 className='font-bold text-lg'>{text.title}</h3>
        <p className='text-gray-800 text-center my-4'>
            {text.description}
            <span className='text-link'>
                {categories?.length > 0 && categories.map(item => {
                    return(
                        <Link
                        to={`/${formatVietnamToString(item.value)}`}
                        key={item.code}
                        className='text-[#6495ED] font-medium hover:text-[#FF0000]'
                        >
                            {`${item.value.toLowerCase()}, `}
                        </Link>
                    )
                })}
            </span>
            {text.description2}
        </p>
        <div className='flex items-center justify-around w-full'>
            {text.statistic.map((item,index)=>{
                return (
                    <div className='flex flex-col justify-center items-center' key={index}>
                        <h4 className='font-bold text-lg'>{item.value}</h4>
                        <p className='text-gray-800'>{item.name}</p>
                    </div>
                )
            })}           
        </div>
        <h3 className='font-bold text-lg py-2'>{text.price}</h3>
        <div className='flex items-center justify-center gap-1'>
            {star.map(item=>{
                return(
                    <span key={item}>
                        <MdStar size={26} color='#FFD700'/>
                    </span>
                )
            })}
        </div>
        <p className='text-gray-500 text-center italic'>{text.comment}</p>
        <span className='text-gray-800'>{text.author}</span>
        <h3 className='font-bold text-lg '>{text.question}</h3>
        <p className='text-gray-800'>{text.answer}</p>
        <Button
        text = 'Đăng tin ngay'
        bgColor = 'bg-[#FF0000]'
        textColor = 'text-[#FFF]'
        />
        <div className='h-2'></div>
    </div>
  )
}

export default memo(Intro)