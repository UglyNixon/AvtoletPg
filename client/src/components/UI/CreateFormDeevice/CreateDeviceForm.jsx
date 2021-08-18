import React, { useState } from 'react';
import MyInput from '../input/MyInput';
import MyLabel from '../label/MyLabel';
import MySelect from '../select/MySelect';
import cl from './CreateDeviceForm.module.css'
const CreateDeviceForm = () => {
    const [vibor, setVibor] = useState(false)
    const [newDevice, setNewDevice] = useState({type:'',codeType:'',totalValue:'',brak:'',series:''})
    const types =[{value:'Экспресс'},{value:'Плюс'}]
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
                
                <div className={[cl.df,cl.jc].join(' ')}>
                <MyInput label='Приход:' style={{width:170}} maxLength={10} placeholder={'числа без знаков'} />
                <MyInput label='Брак:' style={{width:80}} maxLength={4} placeholder={'брак'} />
                </div>
                
               
                
            
          
        </div>
    );
};

export default CreateDeviceForm;