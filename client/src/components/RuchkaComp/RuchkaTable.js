import React, { useContext, useEffect, useState} from 'react';
import { Button, Container, Dropdown, NavItem, Spinner, Table } from 'react-bootstrap';
import { Context } from '../..';
import CreateRuchka from '../models/CreateRuchka';
import styles from '../../styles/table.module.css';
import { observer } from 'mobx-react-lite';
import { fetchWorker } from '../../http/ProductApi';
import { fetchRuchka, filterRuchka } from '../../http/ruchkaApi';
import { Fragment } from 'react';
import RuchkaStats from '../models/RuchkaStats';
import RuchkaEdit from '../models/RuchkaEdit';

const RuchkaTable = observer(() => {

   
   const [modVis,setModVis]= useState(false)
   const [editVis,setEditVis]= useState(false)
   const [statVis,setStatVis]= useState(false)
   const {ruchki,product}=useContext(Context)
   const [loading,setLoading]=useState(true)
   const [filter,setFilter] =useState({workerName:'Все',dolg:'Все',status:'Все',brak:'Все',sort:'Убыв',date:'Все'})
 
   const [editRuchka,setEditRuchka]=useState({series:''})
   const [cworkers,setCworkers]=useState([])
   const [cruchki,setCruchki]=useState([])
   const resetF=()=>{
   setFilter({...filter,workerName:'Все'})
   setFilter({...filter,dolg:'Все'})
   setFilter({...filter,status:'Все'})
   setFilter({...filter,sort:'Убыв'})
   setFilter({...filter,brak:'Все'})
   setFilter({...filter,date:'Все'})
   }
   useEffect (
    ()=>
    fetchWorker()
    .then(data=>{
      setCworkers(data);
   data.unshift(new Proxy ({surname:'Все',id:"Все",workerPlaceId:2},{}))
   product.setWorkers(data.filter(w=>w.workerPlaceId===2))
   })
   .then(()=>fetchRuchka())
   .then(data=>{
    setCruchki(data)
     ruchki.setRuchki(data.sort((a,b)=>b.series-a.series))
    })
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



   const openEdit=(ruchka={series:''})=>{
     setEditRuchka(Object.assign({}, ruchka))
     setEditVis(true)
   }
   const sortAll=(value,data=ruchki.ruchki)=>{
    ruchki.setRuchki(ruchki.sortAll(/Убыв/.test(value),data));
    /Убыв/.test(value) ? setFilter({...filter,sort:'Убыв'}) :setFilter({...filter,sotr:'Возр'})
   }
   const sortDB=(d=filter.dolg,b=filter.brak,s=filter.status,da=filter.date,name=filter.workerName)=>{
      const workerId= product.workers.filter((wor)=>wor.surname.toLowerCase()==name.toLowerCase())[0]['id']
      filterRuchka(d,b,s,da,workerId)
      .then((data)=>ruchki.setRuchki(ruchki.sortAll(/Убыв/.test(filter.sort),data)))
   
    }
   /*      
     костыли для обхода useState()   
     подумать как запихнуть в useEffect(()=>{sortDB()},[brak,dolg ...])     
     вернее как в sort запихнуть проверку на начальное состояние (пустой product.workers)
   */
  /*   
    d useEffect запихать все изменения в таблице,
    внутри sortDB сделать провеку на лоад базы
   должно работать , переписать когда не будет лень
  */
   const dolgSort =(value)=>{
   setFilter({...filter,dolg:value})
    sortDB(value,undefined,undefined,undefined,undefined)
   }
   const brakSort =(value)=>{
    setFilter({...filter,brak:value})
    sortDB(undefined,value,undefined,undefined,undefined)
   }
   const statusSort =(value)=>{
    setFilter({...filter,status:value})
     sortDB(undefined,undefined,value,undefined,undefined)
    }
  const dateSort =(value)=>{
    setFilter({...filter,date:value})
      sortDB(undefined,undefined,undefined,value,undefined)
    }
  const workSort =(value)=>{
    setFilter({...filter,workerName:value})
     sortDB(undefined,undefined,undefined,undefined,value)
    }
    

 
   
     
       
 if (loading) {
   return (
  <Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>
  <Spinner animation="grow" variant="dark" />
  </Container>
   )
 } else {
        
    return (
  
       <Fragment >
         <Container style={{flexDirection:'column'}}>
         <CreateRuchka show={modVis} onHide={()=>setModVis(false)} workers={product.workers}/>
         <RuchkaStats show={statVis} cruchki={cruchki.slice(0)} cworkers={cworkers.slice(1)} onHide={()=>setStatVis(false)}/>
         <RuchkaEdit show={editVis} workers={product.workers.slice(1)} truchka={editRuchka} onHide={()=>{setEditRuchka({series:''});setEditVis(false)}}/>

<Container className='mb-3 p-0' >
 <Button className ='mr-3 mt-2' variant="outline-info" onClick={()=>setStatVis(true)}>Статистика</Button>
 <Button className ='mr-3 mt-2' variant="outline-success" onClick={()=>setModVis(true)}>Создать запись</Button>
 <Button className ='mr-3 mt-2' variant="outline-success" onClick={()=>setEditVis(true)}>Редактировать запись</Button>
 <Button className ='mr-3 mt-2' variant="outline-success" onClick={()=>resetF()}>Обновить/сбросить</Button>
</Container> 
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
                <Dropdown.Toggle style={{width:120}} >{filter.sort}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={(e)=>sortAll(e.target.innerHTML)}>Убыв</Dropdown.Item>
                              <Dropdown.Item  onClick={(e)=>sortAll(e.target.innerHTML)}>Возр</Dropdown.Item>
                              
                </Dropdown.Menu>
      </Dropdown>
    </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:126}} >{filter.workerName||product.workers[0].id}</Dropdown.Toggle>
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
                <Dropdown.Toggle style={{width:60}} >{filter.dolg}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>dolgSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>dolgSort('Есть')}>Есть</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>dolgSort('Нет')}>Нет</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:80}} >{filter.status}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>statusSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>statusSort('Сдано')}>Сдано</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>statusSort('В работе')}>В работе</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


      </th>
      <th className={styles.th}>

            <Dropdown > 
                <Dropdown.Toggle style={{width:80}} >{filter.brak}</Dropdown.Toggle>
                <Dropdown.Menu>
                              <Dropdown.Item  onClick={()=>brakSort('Все')}>Все</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>brakSort('0...99')}>0...99</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>brakSort('100...')}>100...</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



      </th>
      <th className={styles.th}>
      <Dropdown >
                <Dropdown.Toggle style={{width:80}} >{filter.date||'Все'}</Dropdown.Toggle>
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
    {ruchki.ruchki.map(item=>
    <tr style={{cursor:'pointer'}} onClick={()=>openEdit(item)} key={item.series}>
    <td className={styles.th}>{item.series}</td>
    <td className={styles.th}>{product.workers.filter(w=>w.id===item.workerId)[0].surname}</td>
    <td className={styles.th}>{item.totalValue}</td>
    <td className={styles.th}>{item.dolg}</td>
    <td className={styles.th}>{item.status?'Сдано':'В работе'}</td>
    <td className={styles.th}>{item.brak}</td> 
    <td className={styles.th}>{item.date}</td>
</tr>
    )}
  </tbody>
</Table>
</Container>
</Fragment>

    );}
})

export default RuchkaTable;