import React, {memo} from 'react'

const SearchItem = ({IconBefore, IconAfter, text, fontWeight, defaultText}) => {
  return (
    <div className='bg-[#FFF] py-2 px-4 w-[200px]  rounded-md text-gray-400 text-sm flex justify-between items-center'>
    <div className='flex items-center gap-1'>
        {IconBefore}
        <span className={`${fontWeight && 'font-medium text-black'} w-[100px] ${text ? 'font-medium text-black' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}>
           {text || defaultText}
        </span>
    </div>
    {IconAfter}
    </div>
  )
}

export default memo (SearchItem)