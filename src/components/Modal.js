import React, {useState, useEffect, memo} from 'react'
import icons from '../ultils/icons'
import { getNumbersArea, getNumbersPrice } from '../ultils/Common/getNumbers'
import { getCodes,  getCodes1 } from '../ultils/Common/getCode'

const {GrLinkPrevious}  = icons
const Modal = ({setisShowModal,content, name,handleSubmit,queries,arrMinMax,defaultText}) => {
  const [persent1, setpersent1] = useState(
    name === 'price' && arrMinMax?.priceArr 
      ? arrMinMax.priceArr[0] 
      : name === 'area' && arrMinMax?.areaArr 
      ? arrMinMax.areaArr[0] 
      : 0
  );
  const [persent2, setpersent2] = useState(
    name === 'price' && arrMinMax?.priceArr 
      ? arrMinMax.priceArr[1] 
      : name === 'area' && arrMinMax?.areaArr 
      ? arrMinMax.areaArr[1] 
      : 100
  );
  const [activeEl, setActiveEl] = useState('')

  useEffect(() => {
    const activeTrackEl = document.getElementById('track-active')
    if(activeTrackEl){
      if(persent2 <= persent1){
        activeTrackEl.style.left =`${persent2}%`
        activeTrackEl.style.right =`${100 - persent1}%`
      }else{
        activeTrackEl.style.left =`${persent1}%`
        activeTrackEl.style.right =`${100 - persent2}%`
      }
    }
  }, [persent1,persent2])

 const handleClickStrack = (e, value) => {
  
  const trackEl = document.getElementById('track')
  const trackRect = trackEl.getBoundingClientRect()
  let persent =  value ? value : Math.round((e.clientX - trackRect.left)  * 100 / trackRect.width,0)
  if(Math.abs(persent - persent1) <= (Math.abs(persent - persent2))){
    setpersent1(persent)
  }else{
    setpersent2(persent)
  }
 }

const convert100toTarget = persent => {
  return name === 'price' ? (Math.ceil(Math.round((persent * 1.5))/ 5)* 5)/10
  : name === 'area' ? (Math.ceil(Math.round((persent * 0.9))/ 5)* 5) : 0
  
}
const convertTo100 = persent => {
  let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
  return  Math.floor((persent / target)* 100)
}

const handleActive = (code, value) => {
    setActiveEl(code)
    let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
    if(arrMaxMin.length === 1){
      if(arrMaxMin[0] === 1){
        setpersent1(0)
        setpersent2(convertTo100(1))
      }
      if(arrMaxMin[0] === 20){
        setpersent1(0)
        setpersent2(convertTo100(20))
      }
      if(arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setpersent1(100)
        setpersent2(100)
      }
    }
    if(arrMaxMin.length === 2){
      setpersent1(convertTo100(arrMaxMin[0]))
      setpersent2(convertTo100(arrMaxMin[1]))
    }
}

// const handleSubmit = () => {
//   console.log('start', convert100toTarget(persent1))
//   console.log('end', convert100toTarget(persent2))
// }

const handleBeforSubmit = (e) => {
  let min = persent1 <= persent2 ? persent1 : persent2
  let max = persent1 <= persent2 ? persent2 : persent1
  let  arrMinMax = (persent1 === persent2 && persent1 === 100) ? [convert100toTarget(min),999999] : [convert100toTarget(min),convert100toTarget(max)] 
  handleSubmit(e,{
    [`${name}Number`] : arrMinMax,
    [name ] : `Từ ${convert100toTarget(min)}${(persent1 === persent2 && persent1 === 100)
      ? ''
      : ` - ${convert100toTarget(max)}`} ${name === 'price' ? 'triệu' : 'm2'}${(persent1 === persent2 && persent1 === 100) ? ' trở lên' : ''}`
  },{
    [`${name}Arr`]:  [min,max]
  })
}

  return (
    <div onClick={(e)=> {
      e.stopPropagation()
      setisShowModal(false)
    }}
    className='fixed inset-0 bg-overlay-50 z-[9999] flex justify-center items-center overflow-auto'>
      <div onClick={(e)=> {
      e.stopPropagation()
      setisShowModal(true)
    }}
      className='w-2/5 h-[500px] bg-[#FFF] relative  rounded-md z-[10000] overflow-y-scroll  '>
      <div className='h-[45px] px-3 flex items-center border-b border-gray-300 z-20 '>
      <span onClick={(e)=> {
      e.stopPropagation()
      setisShowModal(false)}}  
      className='cursor-pointer'>
      <GrLinkPrevious size={24}/>
      </span>
      </div>
      {(name === 'category' || name === 'province') && <div className='p-4 flex flex-col '>
      <span  className='py-2 flex gap-2 items-center border-b border-gray-300 '>
            <input type="radio" 
            name={name} 
            value={defaultText || ''} 
            id='default'
            checked={!queries[`${name}Code`] ?  true : false}
            onClick={(e) => handleSubmit(e,{[name]: defaultText, [`${name}Code`]: null})}/>
            <label className='cursor-pointer hover:text-[#FF0000]' htmlFor='default'>{defaultText}</label>
          </span>
       {content?.map(item => {
        return(
          <span key={item.code} className='py-2 flex gap-2 items-center border-b border-gray-300 '>
            <input type="radio" 
            name={name} 
            id={item.code} 
            value={item.code} 
            checked={item.code === queries[`${name}Code`] ?  true : false}
            onClick={(e) => handleSubmit(e,{[name]: item.value, [`${name}Code`]: item.code})}/>
            <label className='cursor-pointer hover:text-[#FF0000]' htmlFor={item.code}>{item.value}</label>
          </span>
        )
       })}
      </div>}
      {(name === 'price' || name === 'area') && 
      <div className='p-12  py-20'>
        <div className='flex flex-col items-center justify-center relative'>
        <div className='z-30 absolute top-[-50px] font-bold text-xl text-[#FFB6C1]'>
          {(persent1 === 100 &&  persent2 === 100) 
          ? `Trên ${convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'} + `
          : `Từ ${persent1 <= persent2 
            ? convert100toTarget(persent1) 
            : convert100toTarget(persent2)}- ${persent2 >= persent1 
            ? convert100toTarget(persent2)
            : convert100toTarget(persent1)} ${name === 'price' ? 'triệu' : 'm2'}`}
          
        </div>
          <div onClick={handleClickStrack} id='track' className='slider-track h-[5px] top-0 bottom-0 absolute w-full bg-secondary1 rounded-full'></div>
          <div onClick={handleClickStrack} id='track-active' className='slider-track-active h-[5px] top-0 bottom-0 absolute  bg-[#FFB6C1] rounded-full'></div>
          <input
          max = '100'
          min = '0'
          step = '1'
          type = 'range'
          value = {persent1}
          className='w-full appearance-none pointer-events-none  top-0 bottom-0 absolute'
          onChange={(e) => {
            setpersent1(+e.target.value)
            activeEl && setActiveEl('')
          }}
          />
          <input
          max = '100'
          min = '0'
          step = '1'
          type = 'range'
          value = {persent2}
          className='w-full appearance-none pointer-events-none   top-0 bottom-0 absolute'
          onChange={(e) => {
            setpersent2(+e.target.value)
            activeEl && setActiveEl('')
          }}
          />
          <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
            <span className='cursor-pointer' 
            onClick={(e)=>{
              e.stopPropagation()
              handleClickStrack(e,0)
            }}>
              0
            </span>
            <span className='mr-[-24px] cursor-pointer'
            onClick={(e)=>{
              e.stopPropagation()
              handleClickStrack(e,100)
            }}>
             {name === 'price' ? ' 15 triệu +' : name === 'area' ? 'Trên 90m2' : ''}
              </span>
          </div>
        </div>
       <div className='mt-16'>
            <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
            <div className='flex gap-3  items-center flex-wrap w-full'>
            {content?.map(item => {
              return(
                <button 
                key={item.code} 
                onClick={() => handleActive(item.code, item.value)}
                className={`px-4 py-2 bg-secondary1 text-white rounded-md cursor-pointer  ${item.code === activeEl ? 'bg-secondary2' : ''}`}>
                  {item.value}
                </button>
              )
            })}
            </div>
       </div>
        </div>}
           {(name === 'price' || name === 'area') &&  <button
            type='button'
            className='w-full py-3 absolute bottom-0 font-semibold rounded-bl-md rounded-br-md text-white bg-[#FFB6C1] '
            onClick={handleBeforSubmit}
            >
              ÁP DỤNG
            </button>}
      </div>
    </div>
  )
}

export default memo(Modal)