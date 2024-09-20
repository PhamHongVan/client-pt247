import React ,{useEffect,useState, useSyncExternalStore} from 'react'
import {text} from '../../ultils/constant'
import { Province ,ItemSidebar,  RelatedPost} from '../../components'
import {List} from './index'
import {Pagination,} from './index'
import { useSelector , useDispatch} from 'react-redux'
import { useFormAction, useLocation } from 'react-router-dom'
import { formatVietnamToString } from '../../ultils/Common/FormatVietnamToString'
import * as actions from '../../store/actions'

const Rental = () => {
  const {prices, areas, categories} = useSelector(state=> state.app)
 const [categoryCode, setcategoryCode] = useState('none')
  const location = useLocation()
  const dispatch = useDispatch()
 const [categoryCurrent, setcategoryCurrent] = useState({})

  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnamToString(item.value)}` === location?.pathname)
    setcategoryCurrent(category)
    if(category){
      setcategoryCode(category.code)
    }
  }, [location])
  
  return (
    <div className=' w-[1100px] flex flex-col gap-3 justify-center'  >
   
    <div>
      <h1 className='text-[28px] font-bold'>{categoryCurrent?.header}</h1>
      <p className='text-base text-gray-500'> {categoryCurrent?.subheader}</p>
    </div>
    <Province/>
    <div className='w-full flex gap-4'>
    <div className='w-[70%]'>
      <List  categoryCode={categoryCode}/>
      <Pagination />
    </div>
    <div className='w-[30%] flex flex-col gap-4 justify-start items-center '>

      <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá'/>
      <ItemSidebar  isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích'/>
     <RelatedPost/>
    </div>
    </div>
    </div>
  )
}

export default Rental