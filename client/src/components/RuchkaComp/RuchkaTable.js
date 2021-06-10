import React, { useContext, useEffect, useState} from 'react';
import { Container, Dropdown, Spinner, Table } from 'react-bootstrap';
import { Context } from '../..';
import TableThSt from '../TableThSt';
import styles from '../../styles/table.module.css';
import TableTh from '../TableTh';
import RuchkaTableTr from './RuchkaTableTr';
import { observer } from 'mobx-react-lite';
import { fetchWorker } from '../../http/ProductApi';
import { fetchRuchka } from '../../http/ruchkaApi';
const RuchkaTable = observer(() => {
   const {ruchki,product}=useContext(Context)
   const [loading,setLoading]=useState(true)
   const [workerName,setWorkerName]=useState('')
   const [dolg,setDolg]=useState('Все')
   const [status,setStatus]=useState('Все')
   const [brak,setBrak]=useState('Все')
   const [date,setDate]=useState('')
  const workersArr=[]
   useEffect (
     ()=>
     fetchWorker()
    .then(data=>{
      data.unshift({surname:'Все'})
      product.setWorkers(data)})
    .then(()=>fetchRuchka())
    .then(data=>ruchki.setRuchki(data))
    .then(()=>{
      let set=new Set()
      ruchki.ruchki.forEach(item =>{
      set.add(`20${item.date.slice(item.date.match(/\//).index+1,)}`)
      })
     set=[...set]
      set.unshift('Все')
      ruchki.setDates(set)
    })
    .finally(()=>setLoading(false))
     ,[])
   
  
       
 if (loading) {
   return (
  <Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>
  <Spinner animation="grow" variant="dark" />
  </Container>
   )
 } else {
        
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
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:196}} >{workerName||'Все'}</Dropdown.Toggle>
                <Dropdown.Menu>
                      {
                      product.workers.map(wor=>
                              <Dropdown.Item key={wor.surname} onClick={()=>setWorkerName(wor.surname)}>{wor.surname}</Dropdown.Item>
                      )
                      }
                </Dropdown.Menu>
            </Dropdown>

      </th>
      <th className={styles.th}>шт.</th>
      <th className={styles.th}>
              <Dropdown >
                <Dropdown.Toggle style={{width:196}} >{dolg}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>setDolg('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setDolg('Есть')}>Есть</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setDolg('Нет')}>Нет</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:196}} >{status}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>setStatus('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setStatus('Сдано')}>Сдано</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setStatus('В работе')}>В работе</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


      </th>
      <th className={styles.th}>

            <Dropdown > 
                <Dropdown.Toggle style={{width:196}} >{brak}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>setBrak('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setBrak('0...100')}>0...100</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>setBrak('100...')}>100...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



      </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:196}} >{date||'Все'}</Dropdown.Toggle>
                <Dropdown.Menu>
                      {
                     
                      ruchki.dates.map(date=>
                              <Dropdown.Item key={date} onClick={()=>setDate(date)}>{date}</Dropdown.Item>
                      )
                      }
                </Dropdown.Menu>
            </Dropdown>
        
        </th>
    
    </tr>
  </thead>
  <tbody>
    {ruchki.ruchki.map(item=><RuchkaTableTr key={item.series} ruchka={item} workers={product.workers}/>)}
  </tbody>
</Table>
    );}
})

export default RuchkaTable;