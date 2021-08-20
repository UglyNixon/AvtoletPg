import React from 'react';
import MyInput from '../../UI/input/MyInput';
import Pagination from '../../UI/Pagination/Pagination';
import cl from '../DeviceTable/DeviceTable.module.css'
const DeviceTable = ({device,totalPages,changePage,page,limit}) => {
 
    return (
      <div>
        <MyInput label='Вывод по' flextype='row'/>
        <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
      <table className={cl.styled_table}>
       <thead>
       
         <tr>
           <th>#</th>
           <th>Тип</th>
           <th>Серия</th>
           <th>Приход</th>
           <th>Брак</th>
           <th>Код платы</th>
         </tr>
         
       </thead>
       <tbody>
         {device.map((d,n)=>
         <tr className={n%2?cl.active:''} key={d.id}>
           <th>{`${n+1+(page-1)*limit}.`}</th>
           <th>{d.type}</th>
           <th>{d.series}</th>
           <th>{d.totalValue}</th>
           <th>{d.brak}</th>
           <th>{d.typeCode}</th>
         </tr>
         )}
       </tbody>
     </table>
        
      </div>
     
    );
};

export default DeviceTable;