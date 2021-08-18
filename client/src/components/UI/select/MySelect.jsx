import React from 'react';
import cl from './MySelect.module.css'
const MySelect = ({options,defaultValue,value,onChange,style}) => {
    
    return (
       
      
        <select
        style={style}
        className={cl.MySelect}
        onChange={e=>onChange(e.target.value)}
        value={value}
        >
         <option disabled  selected value=''> {defaultValue}</option>
        {options.map(o=>
        <option 
        key={o.value} 
        value ={o.value}
        >{o.value}
        </option>)
        }
 
        </select>
        
        
    );
};

export default MySelect;