import React from 'react'
import { ProvinceBtn } from './index'
import { location } from '../ultils/constant'

const Province = () => {
  return (
    <div className='flex  items-center justify-center gap-8 py-5'>
    {location.map(item => {
      return (
        <ProvinceBtn 
        key = {item.id}
        image = {item.image}
        name = {item.name}
        provinceCode = {item.provinceCode}
        />
      )
    })}
    </div>
  )
}

export default Province