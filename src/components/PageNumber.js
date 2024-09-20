import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createSearchParams, useNavigate , useSearchParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const notActive = 'w-[46px] h-[48px]  flex justify-center items-center bg-[#FFF] hover:bg-[#DCDCDC] rounded-md ';
const active = 'w-[46px] h-[48px]  flex justify-center items-center bg-[#FF0000] text-[#FFF] hover:opacity-90 rounded-md ';

const PageNumber = ({ currentPage, text, icon, setCurrentPage, type }) => {
    const location = useLocation()
 const navigate = useNavigate();
  const [paramsSearch] = useSearchParams()
   let entries = paramsSearch.entries()
   
  const append = (entries) =>{
    let params = []
    paramsSearch.append('page',+text)
    for(let entry of entries){
        params.push(entry)
    }

    let searchParamObject = {}
    params?.forEach(i => {
      if(Object.keys(searchParamObject)?.some(item => item === i[0] && item !== 'page')){
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]]
 }else{
        searchParamObject = {...searchParamObject, [i[0]] : [i[1]]}
    }
    })
    return searchParamObject
  }
  
  
  
  const handleChangePage = () => {
      if(!(text === '...')){
      setCurrentPage(+text);
        navigate({
            pathname: location?.pathname,
            search: createSearchParams(append(entries)).toString()
        });
     }
    };
    return (
        <div className={+text === +currentPage ? `${active} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}` :   `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    );
};

export default memo(PageNumber);
