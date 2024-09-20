import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import {Button, UpdatePost} from '../../components'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'


const ManagePost = () => {
    const dispatch = useDispatch()
    const [isEdit, setisEdit] = useState(false)
    const {postOfCurrent, dataEdit} = useSelector(state => state.post)
    const [updateData, setupdateData] = useState(false)
    const [posts, setposts] = useState([])
    const [status, setstatus] = useState('0')
    useEffect(()  => {
        !dataEdit && dispatch(actions.getPostsLimitAdmin())
    },[dataEdit,updateData])

    useEffect(()  => {
       !dataEdit && setisEdit(false)
    },[dataEdit])

    useEffect(()  => {
       setposts(postOfCurrent)
     },[postOfCurrent])

    const checkStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())
   
    const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId)
      if(response?.data.err === 0){
        setupdateData(prev => !prev)
      }else{
        Swal.fire('Oops!','Xoá tin đăng thất bại','error')
      }
        }
   
   useEffect(() => {
    if(status === 1){
        const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(',')[1]))
        setposts(activePost)
    } else if(status === 2){
        const expiredPost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(',')[1]))
        setposts(expiredPost)
    }else {
        setposts(postOfCurrent)
    }
   },[status])
    
    

  return (
    <div className='flex flex-col gap-6 '>
        <div className='py-4  border-b border-gray-200  flex items-center justify-between'>
        <h1 className='text-3xl font-medium '>
           Quản lí tin đăng
      </h1>
      <select onChange={e => setstatus(+e.target.value)} value={status} className='outline-none  border p-2 border-gray-200 rounded-md'>
    <option value='0'>Lọc theo trạng thái</option>
    <option value='1'>Đang hoạt động</option>
    <option value='2'>Đã hết hạn</option>
      </select>
        </div>
        <table className='w-full table-auto'>
            <thead>
                <tr className='flex w-full bg-[#6495ED] text-[#FFF] '>
                    <th className='border flex-3 p-2'>Mã tin</th>
                    <th className='border flex-3 p-2'>Ảnh đại diện</th>
                    <th className='border flex-3 p-2'>Tiêu đề</th>
                    <th className='border flex-3 p-2'>Giá</th>
                    <th className='border flex-3 p-2'>Ngày bắt đầu</th>
                    <th className='border flex-3 p-2'>Ngày hết hạn</th>
                    <th className='border flex-3 p-2'>Trạng thái</th>
                    <th className='border flex-3 p-2'>Tuỳ chọn</th>
                </tr>
            </thead>
            <tbody>
                {!posts
                ? <tr>
                    <td>hhjhhjjg</td>
                </tr>
                : posts?.map(item => {
                    return(
                        <tr className='flex items-center h-16' key={item.id}>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >{item?.overviews?.code}</td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >
                   <img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar' className='w-10 h-10 object-cover rounded-md'/>
                </td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >{`${item?.title?.slice(0,40)}...`}</td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >{item?.attributes?.price}</td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >{item?.overviews?.created}</td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >{item?.overviews?.expire}</td>
                <td className='border flex-3 h-full flex items-center justify-center px-2' >
                    {checkStatus(item?.overviews?.expire?.split(',')[1]) ? 'Đang hoạt động' : 'Đã hết hạn'}
                </td>
                <td className='border px-2 flex-3 h-full flex items-center justify-center gap-4'>
                    <Button text = 'Sửa' bgColor = 'bg-[#FF0000]' textColor='text-white' 
                    onClick={() => {
                      dispatch(actions.editData(item))
                        setisEdit(true)
                        }}/>
                    <Button text = 'Xoá' 
                    bgColor = 'bg-[#808080]' 
                    textColor='text-white'
                    onClick={() => handleDeletePost(item?.id)}
                    />
                </td>
            </tr>
                    )
                })
            }
            </tbody>

        </table>
       {isEdit &&  <UpdatePost setisEdit={setisEdit}/>}
    </div>
  )
}

export default ManagePost