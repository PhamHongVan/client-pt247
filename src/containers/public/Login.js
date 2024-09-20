import React, {useState, useEffect} from 'react'
import { InputForm,Button} from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import {useDispatch, useSelector}  from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'



const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {isLoggedIn, msg, update} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [invalidFields, setInvalidFields] = useState([])
    const  [isRegister, setIsRegister] = useState(location.state?.flag)
    const  [payload, setPayLoad] = useState({
        phone: '',
        password: '',
        name: ''
    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    },[location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    },[isLoggedIn])

    
    useEffect(() => {
        console.log('msg:', msg); // Log msg để kiểm tra
        if (msg) {
            Swal.fire('Oops!', msg, 'error');
        }
    }, [msg, update]);
    
    const handleSubmit = async() => {
    let finalPayload = isRegister ? payload : {
        phone: payload.phone,
        password: payload.password
    }
     let invalids = validate(finalPayload, setInvalidFields)
     if(invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    //     const response = await apiRegister(payload)
        // console.log(invalids)
    }
    // console.log(invalidFields)

    // const validate = (payload) => {
    //     // console.log(payload)
    //     let invalids = 0
    //     // chuyển  object thành  mảng
    //     let fields = Object.entries(payload)
    //     // console.log(fields)
    //     fields.forEach(item =>{
    //         if(item[1] === '') {
    //             setInvalidFields(prev =>  [...prev, {
    //                 name: item[0],
    //                 message: 'Bạn không được bỏ trống trường này!'
    //             }])
    //             invalids++
    //         }
    //     })
    //     fields.forEach(item => {
    //         switch (item[0]) {
    //             case 'password':
    //                 if(item[1].length < 6){
    //                     setInvalidFields(prev =>  [...prev, {
    //                         name: item[0],
    //                         message: 'Mật khẩu phải có tối thiểu 6 kí tự!'
    //                     }])
    //                     invalids++
    //                 }
    //                 break;

    //              case 'phone':
    //                 if( !+item[1]){
    //                     setInvalidFields(prev =>  [...prev, {
    //                         name: item[0],
    //                         message: 'Số điện thoại không hợp lệ!'
    //                     }])
    //                     invalids++
    //                 }
    //                 break;
            
    //             default:
    //                 break;
    //         }
    //     })
    //     return invalids
    //     // console.log(fields)
    // }


    return (
        <div  className='bg-[white] w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
            <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
            <div  className='w-full flex flex-col gap-5'>
    {isRegister && < InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} lable={'HỌ TÊN'} value={payload.name} setValue={setPayLoad} keyPayload={'name'}/>}
    <InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} lable={'SỐ ĐIỆN THOẠI'} value={payload.phone} setValue={setPayLoad} keyPayload={'phone'}/>
    <InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} lable={'MẬT KHẨU'} value={payload.password} setValue={setPayLoad} keyPayload={'password'} type = 'password'/>
            <Button
            text= {isRegister ? 'Đăng kí' : 'Đăng nhập'}
            bgColor = 'bg-secondary1'
            textColor = 'text-white'
            fullWidth
            onClick = {handleSubmit}
            />
            </div>
            <div className='mt-7 flex items-center justify-between'>
               {isRegister
               ? <small>Bạn đã có tài khoản? <span
               onClick={() => {
                setIsRegister(false)
            setPayLoad({
                phone: '',
                password: '',
                name: ''
            })
            }}
               className='text-[#FF0000] hover:underline cursor-pointer'
               >
                Đăng nhập ngay</span> </small>
               :  <>
                <small className='text-[#FF0000] hover:text-[#808080] cursor-pointer'>Bạn quên mật khẩu?</small>
                <small
               onClick={() => {
                setIsRegister(true)
                setPayLoad({
                    phone: '',
                    password: '',
                    name: ''
                })
            }}
                className='text-[#FF0000] hover:text-[#808080] cursor-pointer'>Tạo tài khoản mới</small>
                </>}
            </div>
        </div>
    )
}
export default Login