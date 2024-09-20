import React, {useState} from 'react'
import { InputReadOnly,InputFormV2,Button } from '../../components'
import anonAvatar from '../../assets/anon_avatar.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { apiUpdateUser} from '../../services'
import { fileToBase64,blobToBase64 } from '../../ultils/Common/tobase64'
import  {getCurrent} from '../../store/actions'
import Swal from 'sweetalert2'

const EditAccount = () => {
  const {currentData} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [payload, setpayload] = useState({
    name: currentData?.name || '',
    avatar: blobToBase64(currentData?.avatar) || '' ,
    fbUrl:currentData?.fbUrl || '',
    zalo: currentData?.zalo ||'',
  })
   const handleSubmit =  async () => {
   const response  = await apiUpdateUser(payload)
  //  console.log(response)
  if(response?.data?.err === 0){
    Swal.fire('Done!','Chỉnh sửa thông tin cá nhân thành công','success').then(() => {
      dispatch(getCurrent())
    })
  }else{
    Swal.fire('Oops!','Chỉnh sửa thông tin cá nhân thất bại','error')
  }
   }

   const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0])
   setpayload(prev => ({
    ...prev,
    avatar: imageBase64
   }))
   }

  return (
    <div className='flex flex-col h-full items-center'>
      <h1 className='text-3xl w-full text-start font-medium h-[69px]  py-4 border-b border-gray-200'>Chỉnh sửa thông tin cá nhân</h1>
      <div className='w-3/5 flex items-center justify-center h-full '>
      <div className='py-6 flex flex-col  w-full  gap-4'>
          <InputReadOnly value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} direction='flex-row' label='Mã thành viên'/>
          <InputReadOnly value={currentData?.phone} editPhone direction='flex-row' label='Số điện thoại'/>
          <InputFormV2
          name= 'name'
          setValue={setpayload} 
          direction='flex-row'
          label='Tên hiển thị'
          value={payload.name}
          />
          <InputFormV2
          name= 'zalo'
          setValue={setpayload} 
          direction='flex-row'
          value={payload.zalo}
          label='Zalo'
          />
          <InputFormV2
          name= 'fbUrl'
          setValue={setpayload} 
          direction='flex-row'
          label='Facebook'
          value={payload.fbUrl}
          />
          <div className='flex'>
              <label className='w-48' htmlFor='password'>Mật khẩu</label>
              <small className='text-start w-full text-[#6495ED] h-12 cursor-pointer'>Đổi mật khẩu</small>
          </div>
          <div className='flex mb-6'>
              <label className='w-48' htmlFor='avatar'>Ảnh đại diện</label>
              <div>
             <img src={payload.avatar || anonAvatar} alt='avatar' className='w-32 h-32 rounded-full object-cover border-2 '/>
              <input onChange={handleUploadFile} type='file' id='avatar'  className='appearance-none  my-4' />
              </div>
          </div>
          <Button  onClick={handleSubmit} 
        text= 'Cập nhật'
        bgColor='bg-[#808080] hover:bg-[#FF0000]' textColor='text-white'  />
      </div>
      </div>
    </div>
  )
}

export default EditAccount