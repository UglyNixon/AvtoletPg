import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { deleteWorker, fetchWorker, fetchWorkerPlace} from '../../http/ProductApi'


const DeleteWorker = observer(({show,onHide}) => {
   const {product}=useContext(Context)
   const [workerTemp,setWorkerTemp]=useState([])
   const clickDelete=()=>{
     const a= window.confirm(`Вы действительно хотите удалить ${product.selectedWorker.surname} ${product.selectedWorker.name}?`)
   if (a){
    deleteWorker(product.selectedWorker.id).then(()=>
    {alert('Удален'); fetchWorker()
    .then(data=>{console.log('сработано удаление');product.setWorkers(data);setWorkerTemp(data)})}
    )
    product.setSelectedWorker({surname:'Работник'})

   }
    
    
   }
const placeClick=(p)=>{
  product.setSelectedPlace(p)
  setWorkerTemp(product.workers.filter(w=>w.workerPlaceId===p.id))
  product.setSelectedWorker({surname:'Работник'})
}
   useEffect(()=>{
    fetchWorker().then(data=>{product.setWorkers(data);setWorkerTemp(data)})
    fetchWorkerPlace().then(data=>product.setWorkerPlace(data))

   },[])
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
        Удалить работника
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
    <Row>

      <Col md={4}>
      <Dropdown>
       <Dropdown.Toggle variant="success" id="dropdown-basic">
        {product.selectedPlace.title||'Выберите участок'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
  {product.workerPlace.map(p=><Dropdown.Item key={p.id} onClick={()=>placeClick(p)}>{p.title}</Dropdown.Item>)}
       </Dropdown.Menu>
    </Dropdown>

      </Col>

      <Col md={4}>
      <Dropdown>
       <Dropdown.Toggle variant="success" id="dropdown-basic">
        {product.selectedWorker.id?`${product.selectedWorker.surname} ${product.selectedWorker.name}`:'Выберите сборщика'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
  {workerTemp.map(w=>
  <Dropdown.Item 
  key={w.id} 
  onClick={()=>product.setSelectedWorker(w)}
  >{`${w.surname} ${w.name}`}</Dropdown.Item>)}
       </Dropdown.Menu>
    </Dropdown>

      </Col>

    </Row>
      
      
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={()=>clickDelete()}>Удалить</Button>
        <Button variant="warning" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
})

export default DeleteWorker;