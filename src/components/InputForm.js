import React,{memo} from 'react'
const InputForm = ({lable, value, setValue,  keyPayload, invalidFields, setInvalidFields, type}) => {
    return (
        <div>
            <lable htmlFor={keyPayload} className='text-xs'>{lable}</lable>
            <input  type={type || 'text'} id={keyPayload}
            className='outline-none bg-[#fde9ec] p-2 rounded-md w-full '
            value={value}
            onChange={(e)=> setValue(prev => ({...prev, [keyPayload]: e.target.value}))}
            onFocus={() => setInvalidFields && setInvalidFields([])}
            ></input>
    { invalidFields?.some(i => i.name === keyPayload)
 && <small className='text-[#FF0000] italic'>{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
        </div>
    )
}
export default memo(InputForm)