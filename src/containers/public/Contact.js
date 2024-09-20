import React, {useState} from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {
    const [payload, setpayload] = useState({
        name : '',
        phone : '',
        content : ''
    })
    const handleSubmit = () => {
       Swal.fire(`Cảm ơn ${payload.name ? payload.name : '' }`,'Phản hồi của bạn đã được chúng tôi ghi nhận','success').then(() => {
        setpayload({
            name : '',
            phone : '',
            content : ''
        })
       })
    }
  return (
    <div className='w-[1100px]'>
        <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
        <div  className='flex gap-4'>
        <div className='flex flex-3 flex-col gap-4 h-fit rounded-3xl p-4 text-white bg-gradient-to-br from-[#808080] to-[#FFB6C1]'>
            <h4 className='font-medium'>Thông tin liên hệ</h4>
            <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro247.Com</span>
            <span>Điện thoại: 0917 686 101</span>
            <span>Email: cskh.phongtro247@gmail.com</span>
            <span>Zalo: 0917 686 101</span>
            <span>Viber: 0917 686 101</span>
            <span>Địa chỉ: Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam.</span>
        </div>
        <div className='flex-3 bg-[#FFF] shadow-md rounded-md p-4 mb-6 border'>
            <h4 className='font-medium text-lg mb-4'>Liên hệ trực tuyến</h4>
            <div className='flex flex-col gap-6'>
                <InputForm lable='HỌ VÀ TÊN CỦA BẠN' value={payload.name} setValue={setpayload} keyPayload='name'/>
                <InputForm lable='SỐ ĐIỆN THOẠI' value={payload.phone}  keyPayload='phone'  setValue={setpayload}/>
                <div>
                    <label htmlFor='desc'>NỘI DUNG MÔ TẢ</label>
                    <textarea className='outline-none  bg-primary p-2 rounded-md w-full' 
                    id='desc' cols='30' rows='3' value={payload.content} name='content' 
                    onChange={e => setpayload(prev => ({...prev, content:e.target.value}))}
                    ></textarea>
                </div>
                <Button
                text = 'Gửi liên hệ'
                bgColor = 'bg-[#808080] hover:bg-[#FF0000]'
                textColor = 'text-[#FFF]'
                fullWidth
                onClick={handleSubmit}
                />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Contact