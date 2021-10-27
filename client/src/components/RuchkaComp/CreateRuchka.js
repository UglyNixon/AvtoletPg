import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';


import { fetchProducts } from '../../http/ProductApi';
import { createRuchka } from '../../http/ruchkaApi';
import MyDatalist from '../UI/datalist/MyDatalist';

const CreateRuchka = observer(({show,onHide,workers}) => {

  const {ruchki,product}=useContext(Context)

  const [defec, setDefec] = useState([])
  const [defecType,setDefecType] = useState([])
  const addDefec =() =>{
    setDefec([...defec,{title:'',value:'', number: Date.now()}]);
  }
  const changeDefec = (key, value, number) => {
    setDefec(defec.map(i => i.number === number ? {...i, [key]: value} : i))
    
 }
  const deleteDefec =(number) =>{
    setDefec(defec.filter(d => d.number !== number))
  }
  
  useEffect(()=>{
    fetchProducts()
    .then(data=>product.setProducts(data))
  
    
  },[product])
   const [series,setSeries]= useState('')
   const [totalValue,setTotalValue]=useState(1000)
   const [dolg,setDolg]=useState(0)
   const [status,setStatus]=useState(true)
   const [date,setDate]=useState('')
   const [brak,setBrak]=useState(0)
    const addRuchka=()=>{
      if (product.selectedWorker.id==='Все') {
        alert( 'Выберите сборщика')
      } else {
    const formData = new FormData()
    formData.append ('series',series)
    formData.append ('totalValue',totalValue)
    dolg&&formData.append ('dolg',dolg)
    brak&&formData.append ('brak',brak)
    formData.append('status',status)
    formData.append ('date',date)
    formData.append ('workerId',product.selectedWorker.id)
    formData.append ('productId',product.products.filter(item=>item.title==='Ручки')[0].id)
    formData.append('defec', JSON.stringify(defec))
    createRuchka(formData)
        .then(()=>alert('Готово!'))
        .then(()=>onHide())
        .catch(error => alert(error.message));
  }}
  const close =()=>{
    setDefec([])
    onHide()
  }
    return ( 
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
        Добавить ручку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
    <Form>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Серия:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите серию'
      value={series}
      onChange={(e)=>setSeries(e.target.value)}
    />
    </InputGroup>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Заказа на:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите количество по заказу'
      value={totalValue}
      onChange={(e)=>setTotalValue(e.target.value)}
    />
    </InputGroup>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Дата заказа:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите дату заказа (месяц/год)'
      value={date}
      onChange={(e)=>setDate(e.target.value)}
    />
    </InputGroup>
    {status&&
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Долг:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите долг (если есть)'
      value={dolg}
      onChange={(e)=>setDolg(e.target.value)}
    />
    </InputGroup>
}
{status&&
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Брак:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите количество брака (если есть)'
      value={brak}
      onChange={(e)=>setBrak(e.target.value)}
    />
    </InputGroup>
}
    <InputGroup className='d-flex justify-content-around'>   

    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-worker">
    {product.selectedWorker.surname||'Выберите сборщика'}
    </Dropdown.Toggle>

    <Dropdown.Menu>
    {workers.map(worker=> <Dropdown.Item  key={worker.id} onClick={()=>product.setSelectedWorker(worker)}>{worker.surname} </Dropdown.Item>)}
    </Dropdown.Menu>
    </Dropdown>
    
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {status?'Собран':'В работе'}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={()=>setStatus(true)}>Собран</Dropdown.Item>
    <Dropdown.Item onClick={()=>setStatus(false)}>В работе</Dropdown.Item>
  </Dropdown.Menu>
  </Dropdown>
    </InputGroup>
    <hr/>
    <Button variant="success" onClick={()=>addDefec()}>Добавить вид несоответствия</Button>
  {
    defec.map(d=>
  <Row className="mt-2" key={d.number}>
    <Col sm="7">
    <MyDatalist defecType={ruchki.defecTypes} change={changeDefec} defec={defec} number={d.number}/>
    </Col>
    <Col sm='2'>
    <Form.Control type="text" placeholder="0-1000" onChange={(e)=> changeDefec('value',e.target.value,d.number)}/>
    </Col>
    <Col sm="3">
      <Button variant='danger' onClick={()=>deleteDefec(d.number)}>удалить</Button>
    </Col>
  </Row>
  
    
    )
  }
    </Form>
    
   

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={()=>addRuchka()}>Добавить</Button>
        <Button variant="warning" onClick={()=>close()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
})

export default CreateRuchka;