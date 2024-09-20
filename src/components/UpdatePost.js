import React from 'react'
import {CreatePost}  from '../containers/system'

const UpdatePost = ({setisEdit}) => {

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-50 flex justify-center'
    onClick={e => {
        e.stopPropagation()
        setisEdit(false)
    }}    >
        <div className='bg-[#FFF] max-w-1100 w-full overflow-y-auto '
        onClick={e => e.stopPropagation()} 
        >
            <CreatePost isEdit />
        </div>
    </div>
  )
}

export default UpdatePost