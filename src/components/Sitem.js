import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import icons from '../ultils/icons'


const {MdStar} = icons

const Sitem = ({title, price, image, createdAt, star}) => {
  const formatTime = (createdAt)=>{
    return moment(createdAt).fromNow()
  }

  const  handleStar = (star)=> {
    let stars = []
    for(let i =1; i<= +star;i++)stars.push(<MdStar className='star-item' size={22} color='#FFD700'/>)
      return stars
  }

  return (
    <div className='w-full flex items-center gap-2 py-2 border-b border-gray-300'>
        <img
        src={image[0]}
        alt='ảnh'
        className='w-[65px] h-[65px] object-cover rounded-md'
        />
        <div className='w-full flex flex-3 flex-col justify-between gap-1'>
            <h4 className='text-[#6495ED] text-[14px]'>
            {handleStar(+star).length >0 && handleStar(+star).map((star,number)=>{
                      return (
                        <span key={number}>{star}</span>
                      )
                    })}
              {`${title?.slice(0,50)}...`}
            </h4>
            <div className=' flex items-center justify-between w-full'>
                <span className=' text-sm font-medium text-[#FF0000]'>{price}</span>
                <span className='text-[#808080] text-sm '>{formatTime(createdAt)}</span>
            </div>
        </div>
    </div>
  )
}

export default Sitem