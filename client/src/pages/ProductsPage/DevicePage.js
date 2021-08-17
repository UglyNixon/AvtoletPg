import React, { useEffect, useState } from 'react';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import {fetchDevices} from '../../http/deviceApi'
import ds from './style/Device.module.css'
const DevicePage = () => {
    const [device,setDevice]=useState([])
    const [totalPages,setTotalPages]= useState(0)
    const [activeStatus, setActiveStatus] = useState('')
    const [page, setPage] = useState(1)
    const [limit,setLimit] =useState(10)
    const [fetchDevice,isChipFetching,chipError] = useFetching(async(limit,page)=>{
         const response = await fetchDevices(limit,page)
         setDevice(response)
  console.log(response) 
        })

    const accordionMove=()=>{
        if (!activeStatus) setActiveStatus('active')
        if (activeStatus) setActiveStatus('')
    }
 useEffect(() => {
           fetchDevice(limit,page)
    }, [])
    return (
        <div className={[ds.ds,ds.box].join(' ')} >
         <div className={[ds.tail,ds.buttons,ds.ds].join(' ')}>
             <MyButton type={'success'} style={{margin:'0px 10px'}}>Добавить плату</MyButton>
             <MyButton type={'statis'} style={{margin:'0px 10px'}}>Статистика</MyButton>
        </div>
         
         <div className={[ds.accordion,ds.ds,ds.box].join(' ')}>
            <button className={ds.accordion__button} onClick={()=>accordionMove()}>
                    Фильтр
                   </button>
                   <span className={activeStatus? [ds.span,ds.fa_minus].join(' '): [ds.span,ds.fa_plus].join(' ')}>
                        
                    </span>
                <p className={activeStatus?[ds.accordion__content,ds[activeStatus]].join(' '):ds.accordion__content}>
               бла бла бла
                </p>
                
           
        </div>
         <div className={ds.tail}>список</div>
        </div>
    );
};

export default DevicePage;