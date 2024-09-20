import React, { memo, useEffect, useState } from 'react'
import { Select ,InputReadOnly} from '../components'
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services'
import { useSelector } from 'react-redux'

const Address = ({ setPayload, invalidFields,setinvalidFields}) => {

  const {dataEdit} = useSelector(state => state.post)
  const [provinces, setprovinces] = useState([])
  const [districts, setdistricts] = useState([])
  const [province, setprovince] = useState('')
  const [district, setdistrict] = useState('')
  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (dataEdit?.address) {
      let addressArr = dataEdit?.address.split(',')
      let foundProvince = provinces?.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
      setprovince(foundProvince ? foundProvince.province_id : '')
    }
  }, [provinces, dataEdit])

  useEffect(() => {
    if (dataEdit?.address) {
      let addressArr = dataEdit?.address.split(',')
      let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
      setdistrict(foundDistrict ? foundDistrict.district_id : '')
    }
  }, [districts, dataEdit])
  

  useEffect(() => {
    const fetchPulicProvince = async () => {
      const response = await apiGetPublicProvinces()
      if (response.status === 200) {
        setprovinces(response?.data?.results)
      }
    }
    fetchPulicProvince()
  }, [])

  useEffect(() => {
    setdistrict('')
    const fetchPulicDistrict = async () => {
      const response = await apiGetPublicDistrict(province)
      if (response.status === 200) {
        setdistricts(response?.data?.results)
      }
    }
    province && fetchPulicDistrict()
    !province ? setReset(true) : setReset(false)
    !province && setdistricts([])
  }, [province])

  useEffect(() => {
    setPayload(prev => ({
        ...prev,
        address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
        province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
    }))

}, [province, district])


  return (
    <div className=''>
      <h2 className='font-semibold text-xl py-4'> Địa chỉ cho thuê</h2>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Select invalidFields={invalidFields} setinvalidFields={setinvalidFields} type='province' value={province} setValue={setprovince} options={provinces} label='Tỉnh/Thành phố' />
          <Select invalidFields={invalidFields} setinvalidFields={setinvalidFields} reset={reset} type='district' value={district} setValue={setdistrict} options={districts} label='Quận/Huyện' />
        </div>
          <InputReadOnly label='Địa chỉ chính xác' value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}/>
        
      </div>
    </div>
  )
}

export default memo(Address)