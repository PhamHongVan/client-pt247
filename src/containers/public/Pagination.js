import React, { useEffect, useState } from 'react';
import { PageNumber } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons';
import { useSearchParams } from 'react-router-dom';

const { GrLinkNext ,GrLinkPrevious} = icons;
// const arrNumber = [1, 2, 3, 4];

const Pagination = () => {
    const { count, posts } = useSelector(state => state.post);
    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHighEnd, setisHighEnd] = useState(false)
    const [isHighStart, setisHighStart] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(()=> {
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page) 
        !page && setCurrentPage(1)
    },[searchParams])

    useEffect(() => {
        let maxPage = Math.ceil(count /process.env.REACT_APP_LIMIT_POSTS);
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2);
        let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2);
        let temp = [];
        for (let i = start; i <= end; i++) temp.push(i);
        setArrPage(temp)
       currentPage >= ( maxPage-2)  ? setisHighEnd(true) : setisHighEnd(false)
       currentPage <= 3 ? setisHighStart(true) : setisHighStart(false)
    }, [count, posts, currentPage]);

    return (
        <div className='flex items-center justify-center gap-2 py-5'>
           {!isHighStart  && <PageNumber setCurrentPage={setCurrentPage}   text={1}/>}
           {( !isHighStart && currentPage !== 4) && <PageNumber text={'...'} />}
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}  // Ensure this is a function
                        currentPage={currentPage}
                    />
                );
            })}
            { !isHighEnd && <PageNumber text={'...'} />}
           {!isHighEnd && <PageNumber icon={<GrLinkNext />} setCurrentPage={setCurrentPage}   text={Math.floor(count / posts.length)}/>}
        </div>
    );
};

export default Pagination;
