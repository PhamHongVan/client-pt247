import React, {useEffect} from 'react'
import { useParams,useNavigate,createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import Slider from '../../components/Slider'
import icons from '../../ultils/icons'
import BoxInfo from '../../components/BoxInfo'
import {RelatedPost} from '../../components'
import { path } from '../../ultils/constant'


const {FaLocationDot,PiMoneyThin,CiCrop,CiClock2,PiHashThin} = icons

const DetailPost = () => {
  const {postId} = useParams()
  const dispatch = useDispatch()
  const {posts} = useSelector(state => state.post)
  const navigate = useNavigate()

  useEffect (() => {
    postId && dispatch(getPostsLimit({id: postId}))
  },[postId])

const handleFilterLabel = () =>  {
  const  titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`
  navigate({
    pathname: `/${path.SEARCH}`,
    search: createSearchParams({labelCode :posts[0]?.labelData?.code}).toString()
},{state: {titleSearch}});
}
  
  return (
    <div className='w-[1100px] flex gap-4  '>
      <div className='w-[70%] bg-[#FFF] shadow-md rounded-md '>
        <Slider images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)}/>
    <div className=' p-5 '>
    <div className='flex flex-col gap-2 '>
        <h2 className='text-xl font-bold text-[#6495ED]'>{posts[0]?.title}</h2>
      <div className='flex items-center gap-2'>
        <span>Chuyên mục:</span>
        <span 
        onClick={handleFilterLabel}
        className='text-[#FF0000] underline font-medium hover:text-[#808080] cursor-pointer'>{posts[0]?.labelData?.value}</span>
      </div>   
      <div  className='flex items-center gap-2'>
        <FaLocationDot color='#6495ED'/>
      <span>{posts[0]?.address}</span>    
      </div> 
      <div className='flex items-center justify-between'>
        <span className='flex items-center gap-1'>
      <PiMoneyThin/>
      <span className='font-semibold text-lg text-[#FF0000]'>{posts[0]?.attributes?.price}</span>   
        </span>
        <span className='flex items-center gap-1'>
      <CiCrop/>
      <span>{posts[0]?.attributes?.acreage}</span>   
        </span>
        <span className='flex items-center gap-1'>
      <CiClock2/>
      <span>{posts[0]?.attributes?.published}</span>   
        </span>
        <span  className='flex items-center gap-1'>
      <PiHashThin/>
      <span>{posts[0]?.attributes?.hashtag}</span>   
        </span>
      </div>
      </div>
      <div className='mt-8'>
        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
        <div className='flex flex-col gap-3'>
            {posts[0]?.description &&  JSON.parse(posts[0]?.description )?.map((item,index)=> {
              return(
                <span key={index}>{item}</span>
              )
            })}
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
        <table className='w-full'>
          <tbody className='w-full'>
            <tr className='w-full'>
              <td className='p-1'>Mã tin</td>
              <td className='p-1'>{posts[0]?.overviews?.code}</td>
            </tr>
            <tr className='w-full bg-primary'>
              <td className='p-1'>Khu vực</td>
              <td className='p-1'>{posts[0]?.overviews?.area}</td>
            </tr>
            <tr className='w-full'>
              <td className='p-1'>Loại tin rao</td>
              <td className='p-1'>{posts[0]?.overviews?.type}</td>
            </tr>
            <tr className='w-full bg-primary'>
              <td className='p-1'>Đối tượng</td>
              <td className='p-1'>{posts[0]?.overviews?.target}</td>
            </tr>
            <tr className='w-full'>
              <td className='p-1'>Gói tin</td>
              <td className='p-1 text-[#FF0000]'>{posts[0]?.overviews?.bonus}</td>
            </tr>
            <tr className='w-full bg-primary'>
              <td className='p-1'>Ngày đăng</td>
              <td className='p-1'>{posts[0]?.overviews?.created}</td>
            </tr>
            <tr className='w-full'>
              <td className='p-1'>Ngày hết hạn</td>
              <td className='p-1'>{posts[0]?.overviews?.expire}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-8'>
      <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
      <table className='w-full'>
          <tbody className='w-full'>
            <tr className='w-full'>
              <td className='p-1'>Liên hệ</td>
              <td className='p-1'>{posts[0]?.user?.name}</td>
            </tr>
            <tr className='w-full bg-primary'>
              <td className='p-1'>Điện thoại</td>
              <td className='p-1'>{posts[0]?.user?.phone}</td>
            </tr>
            <tr className='w-full'>
              <td className='p-1'>Zalo</td>
              <td className='p-1'>{posts[0]?.user?.zalo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className='mt-8'>
      <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>
      </div> */}
    </div>
      </div>
      <div className='w-[30%] flex flex-col gap-4'>
        <BoxInfo userData={posts[0]?.user}/>
        <RelatedPost/>
        <RelatedPost newPost/>
      </div>
    </div>
  )
}

export default DetailPost