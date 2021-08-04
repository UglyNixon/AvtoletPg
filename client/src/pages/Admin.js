import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateWorkerPlace from '../components/models/CreateWorkerPlace';
import CreateWorkers from '../components/models/CreateWorkers';
import  CreateProductPage  from '../components/models/CreateProductPage'
import  ForceCreatePage  from '../components/models/ForceCreatePage'
import DeleteWorker from '../components/models/DeleteWorker';

const Admin = observer(() => {
    const [workersVis,setWorkersVis]=useState(false)
    const [workerPlaceVis,setWorkerPlaceVis]=useState(false)
    const [productVis,setProductVis]=useState(false)
    const [forceVis,setForceVis]=useState(false)
    const [deleteWorkerVis,setDeleteWorkerVis]=useState(false)
    return (
        <div>
            <Container className="d-flex flex-column">
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setWorkersVis(true)}>Добавить работника</Button>
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setWorkerPlaceVis(true)}>Добавить участок</Button>
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setProductVis(true)}>Добавить продукцию</Button>
            <Button variant='outline-dark' className='mt-2 p-3' onClick={()=>setForceVis(true)}>Добавить данные из файла</Button>
            <br/>
            <Button variant='danger' className='mt-2 p-3' onClick={()=>setDeleteWorkerVis(true)}>Удалить работника</Button>


            <CreateWorkers  show={workersVis} onHide={()=>setWorkersVis(false)}/>
            <CreateWorkerPlace  show={workerPlaceVis} onHide={()=>setWorkerPlaceVis(false)}/>
            <CreateProductPage show={productVis} onHide={()=>setProductVis(false)}/>
            <ForceCreatePage show={forceVis} onHide={()=>setForceVis(false)}/>
            {/* {Удаление} */}
            <DeleteWorker show={deleteWorkerVis} onHide={()=>setDeleteWorkerVis(false)}/>

          
        </Container>
        </div>
    );
})

export default Admin;