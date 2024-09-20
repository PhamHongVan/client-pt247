import React from 'react'

const InputReadOnly = ({label, value, direction,editPhone}) => {
  return (
    <div className={`flex  ${direction ? direction : 'flex-col gap-2 '} `}>
          <label className='font-medium w-48 flex-none' htmlFor='exactly-address'>{label}</label>
          <div  className='w-full'>
          <input
            type='text'
            readOnly
            id='exactly-address'
            className='border outline-none border-[#FFB6C1]  rounded-md bg-primary p-2  w-full'
            value= {value || ''}
          />
      {editPhone &&  <small className='text-[#6495ED] py-4 cursor-pointer'>Đổi số điện thoại</small>}
          </div>
        </div>
  )
}

export default InputReadOnly