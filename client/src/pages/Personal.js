import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '..';
import PersonalItem from '../components/models/PersonalItem';
import { fetchWorker, fetchWorkerPlace } from '../http/ProductApi';
import { WORKER_ROUTE } from '../utils/constant';

const Personal = observer(() => {
    const history=useHistory()
    const {product} =useContext(Context)
    const [workers,setWorkers] =useState([{}])
    useEffect(()=>{

        fetchWorkerPlace().then(data=>product.setWorkerPlace(data))
        fetchWorker().then(data=>setWorkers(data))
    },[])

    return (
        
        <Container className='mt-3'>
            {product.workerPlace.map(i=>
            <Container key={i.id}>
                <Row>{i.title}</Row>

              {
              <Row> 
                  {
              workers.filter(w=>w.workerPlaceId==i.id).map(w=>
              <PersonalItem
               key={w.id}
               worker={w}
                 />
              )
                  }
              </Row> 

              }
              <hr/>
               </Container>  )}
      
        </Container>
    );
})

export default Personal;