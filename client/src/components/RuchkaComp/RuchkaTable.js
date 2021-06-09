import React, { useContext, useEffect, useState} from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { Context } from '../..';
import TableThSt from '../TableThSt';
import styles from '../../styles/table.module.css';
import TableTh from '../TableTh';
import RuchkaTableTr from './RuchkaTableTr';
import { observer } from 'mobx-react-lite';
import { fetchWorker } from '../../http/ProductApi';
const RuchkaTable = observer(() => {
   const {ruchki,product}=useContext(Context)
  
   const [loading,setLoading]=useState(true)
   useEffect (()=>fetchWorker().then(data=>product.setWorkers(data)).finally(()=>setLoading(false)),[])
   const dates = [];
   ruchki.ruchki.map(item=>{
       dates.push({code:item.date})
        })   
 if (loading) {
   return (
  <Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

  <Spinner animation="grow" variant="dark" />
  </Container>
   )
 }else {
        
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
    {ruchki.ruchki.map(item=><RuchkaTableTr key={item.series} ruchka={item}/>)}
  </tbody>
</Table>
    );}
})

export default RuchkaTable;