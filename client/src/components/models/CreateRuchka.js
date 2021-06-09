import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, FormCheck, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { fetchWorker } from '../../http/ProductApi';
import { fetchProducts } from '../../http/ProductApi';

const CreateRuchka = observer(({show,onHide}) => {
    const {product} = useContext(Context)
  useEffect(()=>{
    
    
    fetchWorker().then(data=>product.setWorkers(data))
    fetchProducts().then(data=>product.setProducts(data))
  },[])
   const [series,setSeries]= useState('')
   const [totalValue,setTotalValue]=useState()
   const [dolg,setDolg]=useState(0)
   const [status,setStatus]=useState(true)
   const [date,setDate]=useState('')
   const [brak,setBrak]=useState(0)

  const addRuchka=()=>{
    const formData = new FormData()
    formData.append ('series',series)
    formData.append ('totalValue',totalValue)
    dolg&&formData.append ('dolg',dolg)
    brak&&formData.append ('brak',brak)
    formData.append('status',status)
    formData.append ('date',date)
    formData.append ('workerId',product.selectedWorker.id)
    formData.append ('productId',product.products.filter(item=>item.title=='Ручка').id)

    
  //  createWorker(formData)
  //  .then(()=>{
  //   setName('');
  //   setSurname('');
  //   setCode('');
  //   setFile(null);
  //   product.setSelectedPlace({}) })
  //   .then(()=>alert('Готово!'))
  //   .then(data=>onHide()).catch(error => alert(error.message));

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
    {product.workers.map(worker=> <Dropdown.Item  key={worker.id} onClick={()=>product.setSelectedWorker(worker)}>{worker.surname} </Dropdown.Item>)}
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
    </Form>
    
   

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addRuchka()}>Добавить</Button>
        <Button variant="warning" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
})

export default CreateRuchka;