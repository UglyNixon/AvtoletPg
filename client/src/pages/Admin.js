import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateWorkerPlace from '../components/models/CreateWorkerPlace';
import CreateWorkers from '../components/models/CreateWorkers';
import  CreateProductPage  from '../components/models/CreateProductPage'

const Admin = observer(() => {
    const [workersVis,setWorkersVis]=useState(false)
    const [workerPlaceVis,setWorkerPlaceVis]=useState(false)
    const [productVis,setProductVis]=useState(false)
    return (
        <div>
            <Container className="d-flex flex-column">
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setWorkersVis(true)}>Добавить работника</Button>
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setWorkerPlaceVis(true)}>Добавить участок</Button>
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setProductVis(true)}>Добавить продукцию</Button>
        


            <CreateWorkers  show={workersVis} onHide={()=>setWorkersVis(false)}/>
            <CreateWorkerPlace  show={workerPlaceVis} onHide={()=>setWorkerPlaceVis(false)}/>
            <CreateProductPage show={productVis} onHide={()=>setProductVis(false)}/>
           {/*  <CreateVersion show={versionVisible} onHide={()=>setVersionVisible(false)}/>
            <CreateChip show={chipVisible} onHide={()=>setChipVisible(false)}/> */}
        </Container>
        </div>
    );
})

export default Admin;