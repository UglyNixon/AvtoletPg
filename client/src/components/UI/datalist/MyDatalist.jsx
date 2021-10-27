import React from 'react';

import cl from './MyDatalist.module.css'
const MyDatalist = ({...props}) => {
    
    return (
     <div>
    <input list="option" className={cl.MyInput__imp} defaultValue={props.default} placeholder="Вид несоответствия" onChange={(e)=>props.change('title',e.target.value,props.number)}/>
    <datalist id="option" >
     {props.defecType.map(o=><option value={o}   key={o}/>)}
    </datalist>
    </div>
        
    );
};

export default MyDatalist;