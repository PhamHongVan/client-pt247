import React from 'react'

const InputFormV2 = ({ label, unit, value,setValue, name,  small,invalidFields,setinvalidFields, direction }) => {
    return (
        <div className={`flex ${direction ? direction : 'flex-col'}`}>
            <label className='w-48 flex-auto' htmlFor="title">{label}</label>
            <div className='flex w-full flex-col items-center'>
            <div className='flex  w-full items-center'>
                <input
                    type="text"
                    id=" title"
                    className={`${unit ? 'rounded-tl-md rounded-bl-md' : 'rounded-md'} outline-none  border flex-auto w-full border-gray-300 p-2`}
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    onFocus={() =>  setinvalidFields &&  setinvalidFields([])}
                />
                {unit && <span className='p-2 border flex-none w-24 flex items-center justify-center rounded-tr-md rounded-br-md bg-primary'>{unit}</span>}
            </div>
            {  invalidFields?.some(item => item.name === name) && <small className='text-[#FF0000] block w-full'>
                {invalidFields?.find(item => item.name === name)?.message}
            </small>}
            </div>
            {small && <small className='opacity-70 whitespace-nowrap'>{small}</small>}
        </div>
    )
}

export default InputFormV2