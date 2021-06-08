import React, { useContext} from 'react';
import { Table } from 'react-bootstrap';
import { Context } from '../..';
import TableThSt from '../TableThSt';
import styles from '../../styles/table.module.css';
import TableTh from '../TableTh';
import RuchkaTableTr from './RuchkaTableTr';
import { observer } from 'mobx-react-lite';
const RuchkaTable = observer(() => {
   const {product,user}=useContext(Context)
   const ruchki=product.ruchki
   const dates = [];
   product.ruchki.map(item=>{
       dates.push({code:item.date})
        })   
    return (
        <Table striped bordered hover variant="dark">
  <thead>
  <tr>
      <th className={styles.th}> 
       Серия
    </th>
      <th className={styles.th}>Сборщик</th>
      <th className={styles.th}>Заказ на </th>
      <th className={styles.th}>Долг</th>
      <th className={styles.th}>Статус</th>
      <th className={styles.th}>Брак</th>
      <th className={styles.th}>Дата</th>
    </tr>
    <tr>
      <th className={styles.th}> 
        <TableThSt/>
    </th>
      <th className={styles.th}><TableTh list={product.workers}/></th>
      <th className={styles.th}>шт.</th>
      <th className={styles.th}><TableTh list={[{code:'Все'},{code:'Есть'},{code:'Нет'}]}/></th>
      <th className={styles.th}><TableTh list={[{code:'Все'},{code:'Сдано'},{code:'В работе'}]}/></th>
      <th className={styles.th}><TableTh list={[{code:'Все'},{code:'0-100'},{code:'100-...'}]}/></th>
      <th className={styles.th}><TableTh list={dates}/></th>
    
    </tr>
  </thead>
  <tbody>
    {ruchki.map(item=><RuchkaTableTr key={item.series} ruchka={item}/>)}
  </tbody>
</Table>
    );
})

export default RuchkaTable;