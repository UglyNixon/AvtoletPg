import { observer } from 'mobx-react-lite';
import React, {  useEffect, useState } from 'react';
import { Button, Card, Container,  ListGroup,  Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { fetchOneWorker,  fetchWorkerPlace, } from '../http/ProductApi';
import { PERSONAL_ROUTE } from '../utils/constant';

const WorkerPage = observer(() => {
  const history= useHistory()
  const [loading,setLoading] = useState(true)
  const {id} = useParams()
  const [worker,setWorker] = useState({})
  const [workerPlace,setWorkerPlace] = useState({})
    useEffect(()=>{
        fetchOneWorker(id).then(data=>{data && setWorker(data);console.log(data)}).finally(()=>setLoading(false)) 
    },
    [])
    useEffect(()=>{
      console.log('поиск участка')
     worker &&  fetchWorkerPlace(worker.workerPlaceId).then((data)=>setWorkerPlace(data[0]));
        
    },
    [worker])

          
 if (loading) {
  return (
 <Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>
 <Spinner animation="grow" variant="dark" />
 </Container>
  )
} else {
  if(!worker.id) return ( 
    <Container className="mt-3">
    <Card style={{maxWidth:600}}>
    <Card.Title className='ml-4 mt-2'>Карточка работника</Card.Title>
  <Card.Body>
    
    <hr/>
    <Card.Text>
     {`Мы не нашли такого работника :(`}
    </Card.Text>
    <hr/>
  
    <Button variant="primary" className='mt-3' onClick={()=>history.push(PERSONAL_ROUTE)}>К списку работников</Button>
  </Card.Body>
</Card>

    </Container>
  )
return (
        <Container className="mt-3">

<Card style={{maxWidth:600}}>
    <Card.Title className='ml-4 mt-2'>Карточка работника</Card.Title>
  <Card.Img variant="top" src={process.env.REACT_APP_API_URL + worker.img} style={{width:300,marginBottom:-25,marginLeft:20}}/>
  <Card.Body>
    
    <hr/>
    <Card.Text>
     {`ФИО: ${worker.surname} ${worker.name}`}
    </Card.Text>
    <hr/>
    <ListGroup variant="flush">
    <ListGroup.Item className='mt-1' variant="info">{`Участок работы: ${workerPlace.title}`}</ListGroup.Item>
    <ListGroup.Item className='mt-1' variant="info">{`Код: ${worker.code}`}</ListGroup.Item>
    <ListGroup.Item className='mt-1' variant="info">"Другая информация для добавления через БД"/сделать правку для админа?</ListGroup.Item>
  </ListGroup>
    <Button variant="primary" className='mt-3' onClick={()=>history.push(PERSONAL_ROUTE)}>К списку работников</Button>
  </Card.Body>
</Card>

        </Container>
    );
}})

export default WorkerPage;