import React,{useCallback, useEffect, useState} from 'react'
import { SearchItem ,Modal} from '../../components'
import icons from '../../ultils/icons'
import { useSelector , useDispatch} from 'react-redux'
// import * as actions from '../../store/actions'
import { useNavigate ,createSearchParams, useLocation} from 'react-router-dom'
import { path } from '../../ultils/constant'



const {GrFormNext, CiLocationOn, PiMoneyThin,CiCrop, PiHouseLineThin,FiSearch} = icons
const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isShowModal, setisShowModal] = useState(false)
  const [content, setcontent] = useState([])
  const [name, setName] = useState('')
  const {provinces, areas, prices, categories} = useSelector(state => state.app)
  const [queries, setqueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setdefaultText] = useState('')

  useEffect(() => {
    if(!location?.pathname.includes(path.SEARCH)){
      setArrMinMax({})
      setqueries({})
    }
  },[location])

  const handleShowModal = (content, name, defaultText)=>{
    setcontent(content)
    setName(name)
    setdefaultText(defaultText)
    setisShowModal(true)
  }

  const handleSubmit = useCallback((e, query,arrMinMax) => {
    e.stopPropagation()
    setqueries(prev => ({...prev,...query}))
    setisShowModal(false)
    arrMinMax && setArrMinMax(prev => ({...prev,...arrMinMax}))
  },[isShowModal,queries])
  // console.log(queries)
  
  const handleSearch  = () => {
   const queryCode = Object.entries(queries).filter(item => item[0].includes('Code') || item[0].includes('Number')).filter(item => item[1])
   let queryCodeObj = {}
   queryCode.forEach(item => {queryCodeObj[item[0]] = item[1] })
   const queryText = Object.entries(queries).filter(item => !item[0].includes('Code')  || !item[0].includes('Number'))

    let queryTextObj = {}
    queryText.forEach(item => {queryTextObj[item[0]] = item[1]})
    let titleSearch = `${queryTextObj.category 
      ? queryTextObj.category 
      : 'Phòng trọ, nhà trọ'} ${queryTextObj.province 
        ? `tỉnh ${queryTextObj.province}` 
        : ''} ${queryTextObj.price 
          ? `giá ${queryTextObj.price}` 
          : ''} ${queryTextObj.area 
            ? `diện tích ${queryTextObj.area}` 
            :''}`
    // console.log(titleSearch)

  navigate({
    pathname:path.SEARCH,
    search: createSearchParams(queryCodeObj).toString(),
    
  },{state: {titleSearch}})

  }

  return (
    <>
    <div className=' p-[10px] w-[1100px]  my-3 bg-[#FFB6C1] rounded-lg flex-col lg:flex-row flex gap-2 items-center justify-around'>
       <span onClick={() => handleShowModal(categories,'category','Phòng trọ, nhà trọ')} className='cursor-pointer'>
       <SearchItem IconBefore={<PiHouseLineThin fontSize={16}/>} fontWeight IconAfter={<GrFormNext fontSize={20}/>}
        text= {queries.category} defaultText={'Phòng trọ, nhà trọ'}/>
       </span>
       <span onClick={() => handleShowModal(provinces,'province','Toàn quốc')} className='cursor-pointer'>
       <SearchItem IconBefore={<CiLocationOn fontSize={16}/>} IconAfter={<GrFormNext fontSize={20}/>}
        text= {queries.province} defaultText={'Toàn quốc'}/>
       </span>
       <span onClick={() => handleShowModal(prices,'price','Chọn giá')} className='cursor-pointer'>
       <SearchItem IconBefore={<PiMoneyThin fontSize={16}/>} IconAfter={<GrFormNext fontSize={20}/>}
        text= {queries.price} defaultText={'Chọn giá'}/>
       </span>
       <span onClick={() => handleShowModal(areas,'area','Chọn diện tích')} className='cursor-pointer'>
       <SearchItem IconBefore={<CiCrop fontSize={16}/>} IconAfter={<GrFormNext fontSize={20}/>} 
       text= {queries.area} defaultText={'Chọn diện tích'}/>
       </span>
     <button type='button'
     onClick={handleSearch}
     className='outline-none py-2 px-14 w-auto text-sm bg-secondary2 rounded-lg flex items-center justify-center font-medium text-white gap-2 '>
        <FiSearch />
        Tìm kiếm
     </button>
    </div>
   {isShowModal &&  <Modal 
   handleSubmit={handleSubmit} 
   queries={queries} 
   arrMinMax={arrMinMax} 
   content={content} 
   name={name}
   setisShowModal={setisShowModal}
   defaultText={defaultText}
    />}
    </>
  )
}

export default Search