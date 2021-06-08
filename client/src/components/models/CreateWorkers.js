import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { Context } from '../..';
import {createWorker, fetchWorkerPlace} from '../../http/WorkerApi'


const CreateWorkers = observer(({show,onHide}) => {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [code,setCode] = useState('')
    const [file,setFile] =useState(null)
    const selectedFile=e=>{
      setFile(e.target.files[0])
    }
    const {product} =useContext(Context)
    useEffect(()=>{
      fetchWorkerPlace().then(data=>product.setWorkerPlace(data))
  },[])
  const addWorker=()=>{
    const formData = new FormData()
    formData.append ('name',name)
    formData.append ('surname',surname)
    formData.append ('code',code)
    formData.append('img',file)
    formData.append ('workerPlaceId',product.selectedPlace.id)
    
   createWorker(formData).then(data=>onHide())
  
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
        Добавить работника
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
    <Form>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Имя:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите имя'
      value={name}
      onChange={(e)=>setName(e.target.value)}
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Фамилия:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите фамилию'
      value={surname}
      onChange={(e)=>setSurname(e.target.value)}
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Код:</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите код'
      value={code}
      onChange={(e)=>setCode(e.target.value)}
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Участок работы:</InputGroup.Text>
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {product.selectedPlace.title||'Выберите участок'}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {product.workerPlace.map(place=> <Dropdown.Item  key={place.id} onClick={()=>product.setSelectedPlace(place)}>{place.title} </Dropdown.Item>)}
  </Dropdown.Menu>
</Dropdown>
    </InputGroup>
    <InputGroup  className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Фото:</InputGroup.Text>
    <div className='ml-3 '>   <Form.Control
            className='mt-3'
        type='file'
        onChange={selectedFile}
            /></div>
    </InputGroup>    
  
  
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={()=>addWorker()}>Добавить</Button>
        <Button variant="warning" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
})

export default CreateWorkers;