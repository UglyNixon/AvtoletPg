import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import {  Button, Col, Container, Dropdown, Form,  Modal, Row } from 'react-bootstrap';
import { Context } from '../..';

import { Check,  defCheckForm } from '../../helpers/littleFunc';
import { editRuchka, fetchOneRuchka, fetchRuchka } from '../../http/ruchkaApi';
import MyDatalist from '../UI/datalist/MyDatalist';
// Сделать запрет на выбор несуществующей серии!!!!!!!!!!!!!!!!!!!!!!!! вроде ок
const RuchkaEdit = observer(({show,onHide,workers,truchka}) => {
  const{ruchki,product} =useContext(Context)
  const [error,setError] = useState({})
  const [serSearch,setSerSearch]=useState(truchka.series)
  const [formVis,setFormVis]=useState(false)
  const [read,setRead]=useState(false)
  const [newSeries,setNewSeries]=useState(ruchki.ruchka.series)
  const [newBrak,setNewBrak]=useState(ruchki.ruchka.brak)
  const [newDolg,setNewDolg]=useState(ruchki.ruchka.dolg)
  const [newTotalValue,setNewTotalValue]=useState(ruchki.ruchka.totalValue)
  const [newDate,setNewDate]=useState(ruchki.ruchka.date)
  const [defec, setDefec] = useState([])
  // const [defecType,setDefecType] = useState([])
 
  const changeDefec = (key, value, number) => {
    setDefec(defec.map(i => i.number === number ? {...i, [key]: value} : i))
    
 }
  const deleteDefec =(number) =>{
    setDefec(defec.filter(d => d.number !== number))
  }
  const addDefec =() =>{
    setDefec([...defec,{title:'',value:'', number: Date.now()}]);
  }
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
  if (!defCheckForm(defec)) {
    console.log('не прошло')
    return
  }
  const formData= new FormData()
  formData.append('newSeries',+newSeries)    
  formData.append('series',ruchki.ruchka.series)    
  formData.append('brak',+newBrak)    
  formData.append('dolg',+newDolg)    
  formData.append('totalValue',+newTotalValue)    
  formData.append('date',newDate)  
  formData.append('workerId',product.selectedWorker.id)  
  formData.append('defec', JSON.stringify(defec))
  formData.append('id',ruchki.ruchka.id)
  formData.append ('productId',product.products.filter(item=>item.title==='Ручки')[0].id)
 
  editRuchka(formData).then(data=>{alert('Данные внесены');setFormVis(false); setRead(false);setSerSearch(data)})
  .then(()=>fetchRuchka().then(data=>{
    ruchki.setRuchki(data.sort((a,b)=>b.series-a.series))
   }))
  }
  const inputChange = (value)=>{
   if (value.length===0) {truchka.series=''}
   if(! Check.inputNUmbers(value,value.length)) {return}
     setError({})
     setSerSearch(value)
  
  }
  const openEditForm=(value=serSearch||truchka.series)=>{
    
     if(!Check.series(value,value.length)) {setError(errorStyle); return}
     if (ruchki.ruchki.filter(r=>r.series==value).length==0) {alert('Такой серии не существует(');setSerSearch('');return}
    setError({})
    setRead(true)
    fetchOneRuchka(value)
    .then(data=>{ruchki.setRuchka(data);
      let arr=[]
      ruchki.ruchka.defec.forEach((d,i)=>arr.push({title:d.title,value:d.value,number:Date.now()+i}))
      setDefec(arr)
      
      ;product.setSelectedWorker(workers.filter(w=>w.id===ruchki.ruchka.workerId)[0]);})
      .then(()=>setFormVis(true))
    
  } 


    return ( 
      <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
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
            readOnly={read}
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
<hr/>
<Button variant="success" onClick={()=>addDefec()}>Добавить вид несоответствия</Button>
{
    defec.map(d=>
  <Row className="mt-2" key={d.number}>
    <Col sm="7">
    <MyDatalist defecType={ruchki.defecTypes} default={d.title} change={changeDefec} defec={defec} number={d.number}/>
    </Col>
    <Col sm='2'>
    <Form.Control type="text" placeholder="0-1000" value={d.value} onChange={(e)=> changeDefec('value',e.target.value,d.number)}/>
    </Col>
    <Col sm="3">
      <Button variant='danger' onClick={()=>deleteDefec(d.number)}>удалить</Button>
    </Col>
  </Row>
  
    
    )
  }


 </Container>



 }
      </Modal.Body>
      <Modal.Footer>
      {formVis &&  <Button variant="success"  onClick={()=>makeChange()}>Внести изменения</Button> }
        <Button variant="warning"  onClick={()=>{setSerSearch('');setError({});setFormVis(false);setDefec([]);onHide();setRead(false)}}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
        
    
)

export default RuchkaEdit;