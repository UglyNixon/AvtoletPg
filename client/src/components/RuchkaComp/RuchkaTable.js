import React, { useContext, useEffect, useState} from 'react';
import { Container, Dropdown, NavItem, Spinner, Table } from 'react-bootstrap';
import { Context } from '../..';

import styles from '../../styles/table.module.css';

import RuchkaTableTr from './RuchkaTableTr';
import { observer } from 'mobx-react-lite';
import { fetchWorker } from '../../http/ProductApi';
import { fetchRuchka, filterRuchka } from '../../http/ruchkaApi';

const RuchkaTable = observer(() => {
   const {ruchki,product}=useContext(Context)
   const [loading,setLoading]=useState(true)
   const [workerName,setWorkerName]=useState('Все')
   const [dolg,setDolg]=useState('Все')
   const [status,setStatus]=useState('Все')
   const [brak,setBrak]=useState('Все')
   const [sort,setSort]=useState('Убыв')
   const [date,setDate]=useState('Все')
   const sortAll=(value)=>{
    ruchki.setRuchki(ruchki.sortAll(/Убыв/.test(value),ruchki.ruchki));
    /Убыв/.test(value) ? setSort('Убыв') :setSort('Возр')
   }
   const sortDB=(d=dolg,b=brak,s=status,da=date,name=workerName)=>{
     if(true){
      const formData = new FormData()
      formData.append ('dolgp',/Есть/.test(d)? true : /Все/.test(d)? 'all' :false)
      formData.append ('brakp',/100/.test(b)? 100:/Все/.test(b) ? 'all': 99 )
      formData.append('statusp',/Сдано/.test(s)? true : /Все/.test(s)? 'all' :false)
      formData.append ('datep',da)
      formData.append ('idp',product.workers.filter((wor)=>wor.surname.toLowerCase()==name.toLowerCase())[0]['workerId'])
      console.group('--------****--------------')
      console.log(formData.getAll('idp'))
      console.log(formData.getAll('dolg'))
      console.log(formData.getAll('status'))
      console.log(formData.getAll('brak'))
      console.log(formData.getAll('date'))
      console.groupEnd('````````````*****````````````')

      filterRuchka(formData)


     }
   }
   /*      
     костыли для обхода useState()   
     подумать как запихнуть в useEffect(()=>{sortDB()},[brak,dolg ...])     
     вернее как в sort запихнуть проверку на начальное состояние (пустой product.workers)
   */
   const dolgSort =(value)=>{
    setDolg(value);
    sortDB(value,undefined,undefined,undefined,undefined)
   }
   const brakSort =(value)=>{
    setBrak(value);
    sortDB(undefined,value,undefined,undefined,undefined)
   }
   const statusSort =(value)=>{
     setStatus(value);
     sortDB(undefined,undefined,value,undefined,undefined)
    }
  const dateSort =(value)=>{
      setDate(value);
      sortDB(undefined,undefined,undefined,value,undefined)
    }
  const workSort =(value)=>{
     setWorkerName(value);
     sortDB(undefined,undefined,undefined,undefined,value)
    }
    

   useEffect (
     ()=>
     fetchWorker()
    .then(data=>{
      data.unshift({surname:'Все',idp:0})
      product.setWorkers(data)})
    .then(()=>fetchRuchka())
    .then(data=>ruchki.setRuchki(data.sort((a,b)=>b.series-a.series)))
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
      <Dropdown >
                <Dropdown.Toggle style={{width:120}} >{sort}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={(e)=>sortAll(e.target.innerHTML)}>Убыв</Dropdown.Item>
                              <Dropdown.Item  onClick={(e)=>sortAll(e.target.innerHTML)}>Возр</Dropdown.Item>
                              
                </Dropdown.Menu>
      </Dropdown>
    </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:126}} >{workerName||'Все'}</Dropdown.Toggle>
                <Dropdown.Menu>
                      {
                      product.workers.map(wor=>
                              <Dropdown.Item key={wor.surname} onClick={()=>{workSort(wor.surname)}}>{wor.surname}</Dropdown.Item>
                      )
                      }
                </Dropdown.Menu>
            </Dropdown>

      </th>
      <th className={styles.th}  style={{width:20}}>шт.</th>
      <th className={styles.th}>
              <Dropdown >
                <Dropdown.Toggle style={{width:60}} >{dolg}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>dolgSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>dolgSort('Есть')}>Есть</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>dolgSort('Нет')}>Нет</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:80}} >{status}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>statusSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>statusSort('Сдано')}>Сдано</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>statusSort('В работе')}>В работе</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


      </th>
      <th className={styles.th}>

            <Dropdown > 
                <Dropdown.Toggle style={{width:80}} >{brak}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>brakSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>brakSort('0...99')}>0...99</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>brakSort('100...')}>100...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



      </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:80}} >{date||'Все'}</Dropdown.Toggle>
                <Dropdown.Menu>
                      {
                    
                      ruchki.dates.map(date=>
                              <Dropdown.Item key={date+Math.random() /*придумать другой способ??*/} onClick={()=>dateSort(date)}>{date}</Dropdown.Item>
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