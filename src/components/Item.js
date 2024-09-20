import React,{memo, useState} from 'react'
import icons from '../ultils/icons'
import { useNavigate, Link } from 'react-router-dom'
import {formatVietnamToString} from '../ultils/Common/FormatVietnamToString'
import { path } from '../ultils/constant'


const {MdStar, IoIosHeart, IoIosHeartEmpty, BsBookmarkStarFill} = icons

const Item = ({images,address,attributes,description,star,title,user,id}) => {
    const [isHoverHeart, setIsHoverHeart ] = useState(false)

    const navigate = useNavigate()

  const  handleStar = (star)=> {
    let stars = []
    for(let i =1; i<= +star;i++)stars.push(<MdStar className='star-item' size={22} color='#FFD700'/>)
      return stars
  }

  return (
    <div className='w-full flex border-t border-[#FF0000] p-4 z-10 '>
        <Link  to ={`${path.DETAIL}${formatVietnamToString(title?.replaceAll('/',''))}/${id}`} className='w-2/5 z-10  flex flex-wrap gap-[2px] items-center  relative cursor-pointer'>
          {images.length > 0 && images.filter((i,index)=> [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
            return(
              <img key={index} src={i} alt='preview' className='w-[140px] h-[120px] z-[9998] object-cover'/>
          )
          })}
            <span className='bg-overlay-60 text-white px-2 rounded-md  absolute left-2 bottom-3'>{`${images.length} ảnh`}</span>
            <span 
            className='absolute right-4 bottom-3 text-white '
            onMouseEnter={() => setIsHoverHeart(true) }
            onMouseLeave={() => setIsHoverHeart(false)}
            >              
            {isHoverHeart ? <IoIosHeart size={24} color='#FF0000'/> :<IoIosHeartEmpty size={24}/>}
            </span>
            </Link>
        <div className='w-3/5  pl-5'>
            <div className='flex justify-between gap-4 w-full'>              
                    <Link to ={`${path.DETAIL}${formatVietnamToString(title?.replaceAll('/',''))}/${id}`} className='text-[#6495ED] font-medium '>
                    {handleStar(+star).length >0 && handleStar(+star).map((star,number)=>{
                      return (
                        <span key={number}>{star}</span>
                      )
                    })}
                  {title}
                    </Link>
                  <div className='w-[10%] flex justify-end'>
                   <BsBookmarkStarFill size={24} color='#FFB6C1'/>
                  </div>
                </div>                
                  <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 whitespace-nowrap overflow-hidden  text-ellipsis text-[#FF0000]'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden  text-ellipsis'>{`${address.split(',')[address.split(',').length-2]} ${address.split(',')[address.split(',').length-1]}`}</span>
                  </div>
                  <p className='text-[#696969] w-full h-[50px] text-ellipsis overflow-hidden'>
                 {description}
                  </p>
                  <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center gap-1 w-2/6'>
                        <img src='https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg' 
                        alt='avartar' 
                        className='w-[30px] h-[30px] object-cover rounded-full'></img>
                        <p className='text-[#808080] '>{user?.name}</p>
                    </div>
                

                        <div className='flex items-center gap-1'>
                            <a
                            type='button'
                            className='bg-[#FFB6C1] text-white p-[1px] rounded-md  '
                            href='/'
                            > 
                            {`Gọi ${user?.phone}`}
                             </a>
                            <a
                            type='button'
                            className='text-[#FFB6C1] px-1 rounded-md border border-[#FFB6C1]'
                            href={`https://zalo.me/${user?.zalo}`}
                            target='_blank'
                            >
                            Nhắn zalo
                            </a>
                        </div>
                    
                  </div>
                </div>
            </div>  
  )
}

export default memo(Item)