import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Context } from '..';
import PersonalItem from '../components/models/PersonalItem';
import { fetchWorker, fetchWorkerPlace } from '../http/ProductApi';


const Personal = observer(() => {

  

 

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
              workers.filter(w=>w.workerPlaceId===i.id).map(w=>
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