import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { createDevice } from '../../../http/deviceApi';
import MyInput from '../../UI/input/MyInput';
import MyInputsGroup from '../../UI/inputsGroup/MyInputsGroup';

import MyButton from '../../UI/MyButton/MyButton'
import MySelect from '../../UI/select/MySelect';
import cl from './CreateDeviceForm.module.css'
const CreateDeviceForm = ({visible,setVisible}) => {
    const [brakCode, setBrakCode] = useState({vis:false,title:'Добавить брак по коду'})
    const [vibor, setVibor] = useState(false)
    const [newDevice, setNewDevice] = useState({type:'',codeType:'',totalValue:'',brak:'',series:''})
    const types =[{value:'Экспресс'},{value:'Плюс'}]
    const [brakInfo, setBrakInfo] = useState([{id:1,value:''},{id:2,value:''},{id:3,value:''},{id:4,value:''},{id:5,value:''},])
  
    const codeTypes =
        [
        {type:'Плюс',value:'PKG 2_V7'},
        {type:'Плюс',value:'PKG 2_V5'},
        {type:'Плюс',value:'PKG 2_v6'},
        {type:'Экспресс',value:'030010123'},
        {type:'Экспресс',value:'030010124'},
        {type:'Экспресс',value:'030010126'}
    ]
    const [sortCodeTypes,setSortCodeTypes] =useState([...codeTypes.sort((a,b)=>a.value.localeCompare(b.value))])

  const setType =(t)=>{
    setNewDevice({...newDevice,type:t})
    setVibor(true)
    setSortCodeTypes([...codeTypes.filter(i=>i.type===t).sort((a,b)=>a.value.localeCompare(b.value))])
  }
  const closeModal=()=>{
    setNewDevice({...newDevice,totalValue:'',brak:'',series:''})
    setBrakInfo([...[{id:1,value:''},{id:2,value:''},{id:3,value:''},{id:4,value:''},{id:5,value:''}]])
    setBrakCode({vis:false,title:'Добавить брак по коду'})
    setVisible(false)
   
  
  }
  const createNewDevice = ()=>{
    const formData = new FormData()
    formData.append('series',newDevice.series)
    formData.append('typeCode',newDevice.codeType)
    formData.append('totalValue',newDevice.totalValue)
    formData.append('type',newDevice.type)
    formData.append('brak',newDevice.brak)
    formData.append('defec',JSON.stringify(brakInfo))

   createDevice(formData).then((data)=>{
    setNewDevice({...newDevice,totalValue:'',brak:'',series:''})
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Плата серии ${data} была успешно добавлена`,
    showConfirmButton: false,
    timer: 1500
  })

})
    
  }
const brakCodeFunc = ()=> {
  brakCode.vis? setBrakCode({vis:false,title:'Добавить брак по коду'}):setBrakCode({vis:true,title:'Убрать брак по коду'})
}
    return (  
        <div className={cl.cont}>
            <div className={[cl.df,cl.jc].join(' ')}>
            <MySelect
            style={{width:120}}
             options={types}
              defaultValue='Выберите Тип'
               onChange={t=>setType(t)}
            />
             {vibor&&<MySelect
            style={{width:300}}
             options={sortCodeTypes}
              defaultValue='Выберите Код'
               onChange={ct=>setNewDevice({...newDevice,codeType:ct})}
            />}
            </div>
                <div>
                  <MyInput
                  flextype='row'
                  value={newDevice.series}
                   label='Серия:'
                    maxLength={8}
                     placeholder={'серия...'}
                      onChange={(e)=>setNewDevice({...newDevice,series:e.target.value})}
                      />
                </div>
                <div className={[cl.df,cl.jc].join(' ')}>
                <MyInput
                flextype='row'
                value={newDevice.totalValue}
                 label='Приход:'
                  style={{width:170}}
                   maxLength={10}
                    placeholder={'числа без знаков'}
                    onChange={(e)=>setNewDevice({...newDevice,totalValue:e.target.value})}
                     />
                <MyInput
                flextype='row'
                value={newDevice.brak}
                 label='Брак:'
                  style={{width:80}}
                   maxLength={4}
                    placeholder={'брак'}
                     onChange={(e)=>setNewDevice({...newDevice,brak:e.target.value})}
                     />
                </div>
                <hr/>
                <div>
                  <MyButton  style={{marginTop:10}} type={'success'} onClick={brakCodeFunc}>{brakCode.title}</MyButton>
                  {brakCode.vis&&<MyInputsGroup  brakInfo={brakInfo} setBrakInfo={setBrakInfo}/>}
                </div>
                <hr/>
                <div className={[cl.df,cl.jc_e].join(' ')}>
                  <MyButton type={'success'} onClick={createNewDevice}>Добавить</MyButton>
                  <MyButton style={{marginLeft:10}} type={'statis'} onClick={closeModal}>Закрыть</MyButton>
                </div>
               
                
            
          
        </div>
    );
};

export default CreateDeviceForm;