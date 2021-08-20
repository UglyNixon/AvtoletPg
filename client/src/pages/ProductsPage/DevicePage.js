import React, { useContext, useEffect, useState } from 'react';
import DeviceTable from '../../components/DeviceComp/DeviceTable/DeviceTable.jsx';
import MyModal from '../../components/models/NotBtModals/MyModal';
import CreateDeviceForm from '../../components/DeviceComp/CreateFormDevice/CreateDeviceForm'
import MyLoader from '../../components/UI/Loader/MyLoader';
import MyButton from '../../components/UI/MyButton/MyButton'
import { useFetching } from '../../hooks/useFetching';
import {fetchDevices} from '../../http/deviceApi'
import ds from './style/Device.module.css'
import { getPageCount } from '../../utils/pages.js';
import { Context } from '../../index.js';
const DevicePage = () => {
    const {device} = useContext(Context)
    
    const [totalPages,setTotalPages]= useState(0)
    const [activeStatus, setActiveStatus] = useState('')
    const [page, setPage] = useState(1)
    const [limit,setLimit] =useState(10)
    const [createVis,setCreateVis] =useState(false)
    const [fetchDevice,isChipFetching,chipError] = useFetching(async(limit,page)=>{
         const response = await fetchDevices(limit,page)
         device.setDevices(response.rows)
         setTotalPages(getPageCount(response.count,limit))
        })
        const changePage =(p)=>{
            device.setPage(p)
            fetchDevice(limit,p)
           }

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
                 setVisible={setCreateVis} visible={createVis}
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
              <div>
                  
              </div>
              <div>2.6 2.7 124 126</div>

              </div>
             </div>
                
  
        </div>

        <hr style={{width:'90%'}}/>
         <div className={ds.tail}>
            {isChipFetching?<MyLoader/>
            :
            chipError ?
            <div>Что-то пошло не так</div>
            :
            <DeviceTable device={device.devices} totalPages={totalPages} page={device.page} changePage={changePage} limit={limit}/>
            
            
            }
            


         </div>
        </div>
    );
};

export default DevicePage;