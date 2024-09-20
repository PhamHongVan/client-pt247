import React,{memo} from 'react'
import { useNavigate ,createSearchParams} from 'react-router-dom'
import { path } from '../ultils/constant'

const ProvinceBtn = ({name, image,provinceCode}) => {
  const navigate = useNavigate()
  const titleSearch = `Cho thuê ${name}, Giá Rẻ, Tiện Nghi, Mới Nhất 2024`
const handleOnclick = () => {
  navigate({
    pathname:path.SEARCH,
    search: createSearchParams({provinceCode}).toString(),
    
  },{state: {titleSearch}})

}

  return (
    <div className='shadow-md rounded-bl-md rounded-br-md cursor-pointer text-[#696969] hover:text-[#FF0000] bg-[#FFF]  '
    onClick={handleOnclick}
    >
        <img 
        src = {image}
        alt = {name}
        className='w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md]'
        />
        <div className='font-medium p-2  text-center   '> {name}</div>
    </div>
  )
}

export default memo(ProvinceBtn)