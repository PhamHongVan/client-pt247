import React,{useEffect,useState} from 'react'
import { Button,Item } from '../../components'
import { getPosts, getPostsLimit } from '../../store/actions/post'
import {useDispatch, useSelector} from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = ({categoryCode}) => {
  const dispatch = useDispatch()
  const {posts} = useSelector(state  => state.post)
  const [searchParams] = useSearchParams()
  const [sort, setsort] = useState(0)
  
  useEffect(() =>{
    let params = []
    for(let entry of searchParams.entries()){
      params.push(entry)
    }
    let searchParamObject = {}
    params?.forEach(i => {
      if(Object.keys(searchParamObject)?.some(item => item === i[0])){
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]]
 }else{
        searchParamObject = {...searchParamObject, [i[0]] : [i[1]]}
    }
    })
    
   if(categoryCode) searchParamObject.categoryCode = categoryCode
   if(sort === 1) searchParamObject.order = ['createdAt','DESC']
  dispatch(getPostsLimit(searchParamObject))
  },[searchParams,categoryCode,sort])
  return (
    <div  className='w-full border  p-2 bg-[#FFF] shadow-md rounded-md '>
     <div className='flex items-center justify-between my-3 px-4'>
      <h4 className='text-xl font-semibold '>Danh sách tin đăng</h4>
      <span>Cập nhật: 12:05 25/08/2022</span>
     </div>
     <div className='flex items-center gap-2 my-2 px-4'>
      <span>Sắp xếp:</span>
      <span onClick={() => setsort(0)} className={`p-2 rounded-md cursor-pointer hover:underline bg-[#DCDCDC] ${sort === 0 && 'text-[#FF0000]'}`}>Mặc định</span>
      <span onClick={() => setsort(1)} className={`p-2 rounded-md cursor-pointer hover:underline bg-[#DCDCDC] ${sort === 1 && 'text-[#FF0000]'}`}>Mới nhất</span>
     </div>
     <div className='items'>
      {posts?.length > 0 &&  posts.map(item => {
        return(
          <Item
          key = {item?.id}
          address = {item?.address}
          attributes = {item?.attributes}
          description = {JSON.parse(item?.description)}
          images = {JSON.parse(item?.images?.image)}
          star = {+item?.star}
          title = {item?.title}
          user = {item?.user}
          id = {item?.id}
          />
        )
      })}
     </div>
   

    </div>
  )
}

export default List