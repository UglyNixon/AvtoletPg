import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';

import { Check } from '../../helpers/littleFunc';
import { fetchOneRuchka } from '../../http/ruchkaApi';


const RuchkaEdit = observer(({show,onHide,workers,truchka}) => {
  const{ruchki,product} =useContext(Context)
  const [error,setError] = useState({})
  const [serSearch,setSerSearch]=useState(truchka.series)
  const [formVis,setFormVis]=useState(false)
  const [newSeries,setNewSeries]=useState(ruchki.ruchka.series)
  const [newBrak,setNewBrak]=useState(ruchki.ruchka.brak)
  const [newDolg,setNewDolg]=useState(ruchki.ruchka.dolg)
  const [newTotalValue,setNewTotalValue]=useState(ruchki.ruchka.totalValue)
  const [newDate,setNewDate]=useState(ruchki.ruchka.date)
  useEffect(()=>{
    setNewSeries(ruchki.ruchka.series)
    setNewBrak(ruchki.ruchka.brak)
    setNewDolg(ruchki.ruchka.dolg)
    setNewTotalValue(ruchki.ruchka.totalValue)
    setNewDate(ruchki.ruchka.date)
  },[ruchki.ruchka])
  const errorStyle={
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
  }
  const makeChange=()=>{
    onHide()
  }
  const inputChange = (value)=>{
   if (value.length===0) {truchka.series=''}
   if(! Check.inputNUmbers(value,value.length)) return
     setError({})
     setSerSearch(value)
  
  }
  const openEditForm=(value=serSearch||truchka.series)=>{
     if(!Check.series(value,value.length)) {setError(errorStyle)
  }else {
    setError({})
    fetchOneRuchka(value).then(data=>{ruchki.setRuchka(data);product.setSelectedWorker(workers.filter(w=>w.id===ruchki.ruchka.workerId)[0]);setFormVis(true)})
    
  } 
}

    return ( 
      <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Редактировать запись
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
        <Col md={8}>
          <Form.Control 
          type="text" 
           value={serSearch||truchka.series}
            placeholder='Введите серию'
            maxLength={6}
             onChange={e=>inputChange(e.target.value)}
             aria-describedby="seriesIII"
             style={error}
             />
             
              {!formVis&&<Form.Text id="seriesIII" muted >
    {error.textDecorationLine?`формат не верен ( введите 6 цифр)`:` 6 цифр год+номер (XXYYYY) `}
  </Form.Text>



              } 
             </Col>
        <Col md={4}><Button onClick={()=>openEditForm()}>Найти данные</Button></Col>
        
      </Row>
 {
formVis&& <Container className='mt-2 p-0'>
<Dropdown className=" mt-3">
    <Dropdown.Toggle variant="success" id="dropdown-worker">
    {product.selectedWorker.surname||'Выберите сборщика'}
    </Dropdown.Toggle>

    <Dropdown.Menu>
    {workers.map(worker=> <Dropdown.Item  key={worker.id} onClick={()=>product.setSelectedWorker(worker)}>{worker.surname} </Dropdown.Item>)}
    </Dropdown.Menu>
    </Dropdown>

    <Form.Group as={Row} className=" mt-3" >
    <Form.Label column sm="2">
      Серия:
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="XXYYYY"  value={newSeries} onChange={(e)=>setNewSeries(e.target.value)}/>
    </Col>
  </Form.Group>
    <Form.Group as={Row} className=" mt-3" >
    <Form.Label column sm="2">
      Собрано:
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="1000/1200"  value={newTotalValue} onChange={(e)=>setNewTotalValue(e.target.value)}/>
    </Col>
  </Form.Group>
    <Form.Group as={Row} className=" mt-3" >
    <Form.Label column sm="2">
      Долг:
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="0-1000"  value={newDolg} onChange={(e)=>setNewDolg(e.target.value)}/>
    </Col>
  </Form.Group>
    <Form.Group as={Row} className=" mt-3" >
    <Form.Label column sm="2">
      Брак:
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="0-1000"  value={newBrak} onChange={(e)=>setNewBrak(e.target.value)} />
    </Col>
  </Form.Group>
    <Form.Group as={Row} className=" mt-3" >
    <Form.Label column sm="2">
      Дата:
    </Form.Label>
    <Col sm="6">
      <Form.Control type="text" placeholder="MM/YY"  value={newDate} onChange={(e)=>setNewDate(e.target.value)} />
    </Col>
  </Form.Group>
  
 </Container>



 }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success"  onClick={()=>makeChange()}>Внести изменения</Button>
        <Button variant="warning"  onClick={()=>{setSerSearch('');setError({});setFormVis(false);console.log(newSeries);onHide();}}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
        
    
)

export default RuchkaEdit;