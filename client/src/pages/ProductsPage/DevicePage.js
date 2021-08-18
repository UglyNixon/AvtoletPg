import React, { useEffect, useState } from 'react';
import MyModal from '../../components/models/NotBtModals/MyModal';
import CreateDeviceForm from '../../components/UI/CreateFormDeevice/CreateDeviceForm';
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
    const [createVis,setCreateVis] =useState(false)
    const [fetchDevice,isChipFetching,chipError] = useFetching(async(limit,page)=>{
         const response = await fetchDevices(limit,page)
         setDevice(response)
  
        })
      

    const accordionMove=()=>{
        if (!activeStatus) setActiveStatus('active')
        if (activeStatus) setActiveStatus('')
    }
 useEffect(() => {
           fetchDevice(limit,page)
    }, [])
    return (

            

        <div className={[ds.df,ds.box].join(' ')} >
            <MyModal visible={createVis} setVisible={setCreateVis}>
                
                <CreateDeviceForm 
                 
                />
                </MyModal>
             <div className={[ds.tail,ds.buttons,ds.df].join(' ')}>
             <MyButton 
             type={'success'} 
             style={{margin:'0px 10px'}}
             onClick={()=>setCreateVis(true)}
             >Добавить плату</MyButton>
             <MyButton type={'statis'} style={{margin:'0px 10px'}}>Статистика</MyButton>
        </div>
         <hr style={{width:'90%'}}/>
         <div className={[ds.accordion,ds.df,ds.box].join(' ')}>
            <button className={ds.accordion__button} onClick={()=>accordionMove()}>
                    Фильтр
            </button>
                   <span
                   onClick={()=>accordionMove()}
                   className={activeStatus? [ds.span,ds.fa_minus].join(' '): [ds.span,ds.fa_plus].join(' ')}>
                        
                    </span>
             <div className={activeStatus?[ds.accordion__content,ds[activeStatus]].join(' '):[ds.accordion__content].join(' ')}>
              <div className={[ds.df,ds.box].join(' ')}>
              <div >плюс Экспресс</div>
              <div>2.6 2.7 124 126</div>

              </div>
             </div>
                
  
        </div>

        <hr style={{width:'90%'}}/>
         <div className={ds.tail}>список</div>
        </div>
    );
};

export default DevicePage;