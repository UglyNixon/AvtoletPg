import React from 'react';
import MyInput from '../input/MyInput';
import cl from '../inputsGroup/MyInputGroup.module.css'
const MyInputsGroup = ({brakInfo,setBrakInfo}) => {
   
    return (
        <div className={cl.box} >
        {brakInfo.map((b,n)=>
        <MyInput flextype='column' label={b.id} key={b.id} value={b.value}
        onChange = {(e)=>setBrakInfo(brakInfo.map(bi=>bi.id===n+1?{id:bi.id,value:e.target.value}:{...bi}))}
         />)}
        </div>
    );
};

export default MyInputsGroup;