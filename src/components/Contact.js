import React from 'react'
import { text } from '../ultils/dataContact'
import {Button} from '../components'


const Contact = () => {
  return (
    <div className='border gap-6 w-[1100px] bg-[#FFF] rounded-md shadow-md p-6 flex flex-col items-center justify-center  '>
        <img
        src={text.image}
        alt='thumbnal'
        className='w-full h-48 object-contain'
        />
        <p>{text.content}</p>
        <div className='flex items-center justify-around w-full'>
         {text.contacts.map((item, index)=>{
            return(
                <div key={index} className='flex flex-col items-center justify-center'>
                    <span className='text-[#FFB6C1] font-bold'>{item.text}</span>
                    <span className='text-[#808080] text-[20px] font-semibold'>{item.phone}</span>
                    <span className='text-[#808080] text-[20px] font-semibold'>{item.zalo}</span>
                </div>
            )
         })}
        </div>
        <Button
        text = 'Gửi liên hệ'
        bgColor = 'bg-[#FF0000]'
        textColor = 'text-[#FFF]'
        />
        </div>
  )
}

export default Contact