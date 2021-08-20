import React from 'react';
import { getPageArray } from '../../../utils/pages';
import cl from '../Pagination/Pagination.module.css'
const Pagination = ({totalPages,page,changePage}) => {
    const pagesArray = getPageArray(totalPages)
    console.log(pagesArray)
    return (

        <div className={cl.page__wrapper}>
          {pagesArray.map(p=>
                <span 
                key ={p} 
                    className={p===page?[cl.page,cl.page__current].join(' '):cl.page}
                        onClick={()=>changePage(p)}
                >
      {p}</span>)}
  
        </div>

    );
};

export default Pagination;