
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '../..';
import {  Stat, workerFilter } from '../../helpers/littleFunc';
import { WORKER_ROUTE } from '../../utils/constant';


const RuchkaStats = observer(({show,onHide,cruchki,cworkers}) => {
  let ruchkiTemp=cruchki.slice(0)
  const history = useHistory()
  const [date,setDate] = useState('Все') 
  date !=='Все'? ruchkiTemp=ruchkiTemp.filter(r=>r.date.includes(date)) :ruchkiTemp=cruchki;
  let dateSet=new Set()
  cruchki.forEach(r => {
  dateSet.add(`${r.date.slice(r.date.match(/\//).index+1,)}`)
  });
  dateSet=Array.from(dateSet.add('Все'))
  let total = Stat.made('totalValue',workerFilter(ruchkiTemp))
  const dateFilter =(date)=>{
   
  }
 
    return (
        <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Статистика по сборщикам
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="Общая">

  <Row>
 <Dropdown className='ml-3 mb-3'>   
 <Dropdown.Toggle variant="success" id="dropdown-basic">
    {date}
  </Dropdown.Toggle>
  <Dropdown.Menu>
                      {
                    
                      dateSet.map(date=>
                              <Dropdown.Item key={date} onClick={()=>{setDate(date);dateFilter(date)}}>{date}</Dropdown.Item>
                      )
                      }
  </Dropdown.Menu>   
 
  </Dropdown>
  </Row>
  <Table striped bordered hover id='table'>
   
      
  
      <thead>
    <tr>
      <th>#</th>
      <th>ФИО</th>
      <th>Собрано ,шт./<br/>
      % общего
      </th>
      <th>Долг ,шт. /<br/>
       серий
      </th>
      <th>Брак ,шт./ <br/>
      % средний
      </th>
    </tr>
  </thead>
  <tbody>
 

    <tr>
      <td>1</td>
      <td>Все</td>
      <td>{`${total} / ${(total/total*100).toFixed(2)}%`}</td>
      <td>{`${Stat.made('dolg',workerFilter(ruchkiTemp))} / ${Stat.count('dolg',workerFilter(ruchkiTemp))}`}</td>
      <td>{`${Stat.made('brak',workerFilter(ruchkiTemp))} / ${(Stat.made('brak',workerFilter(ruchkiTemp))/total*100).toFixed(2)}%`}</td>
    </tr>
  {
   cworkers.filter((w)=>w.workerPlaceId===2).map((w,i)=>
      <tr key={w.id}>
        <td>{i+2}</td>
        <td  style={{cursor:'pointer'}} onClick={()=>history.push(WORKER_ROUTE+`/`+w.id)}>{`${w.surname} ${w.name}`}</td>
        <td>{`${Stat.made('totalValue',workerFilter(ruchkiTemp,w.id))} / ${(Stat.made('totalValue',workerFilter(ruchkiTemp,w.id))/total*100).toFixed(2)}%`}</td>
        <td>{`${Stat.made('dolg',workerFilter(ruchkiTemp,w.id))} / ${Stat.count('dolg',workerFilter(ruchkiTemp,w.id))}`}</td>
        <td>{`${Stat.made('brak',workerFilter(ruchkiTemp,w.id))} / ${(Stat.made('brak',workerFilter(ruchkiTemp,w.id))/Stat.made('totalValue',workerFilter(ruchkiTemp,w.id))*100).toFixed(2)}%`}</td>
      </tr>
      )

  }
  </tbody>
</Table>
    
  </Tab>
  <Tab eventKey="profile" title="Виды Брака">
<div style={{height:380}} className='d-flex align-items-center justify-content-center'>
  В разработке ;)
</div>
  </Tab>
  
</Tabs>
      
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="warning" onClick={()=>onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default RuchkaStats;