import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Context } from '../..';
import CreateRuchka from '../../components/models/CreateRuchka';
import RuchkaTable from '../../components/RuchkaComp/RuchkaTable';


const RuchkaPage = observer(() => {
    const [modVis,setModVis]= useState(false)
    const {user,product}= useContext(Context)
    
    return (


      <Container style={{marginTop:'5%',marginLeft:0}}>
        <CreateRuchka show={modVis} onHide={()=>setModVis(false)} />
{user.isAuth?
    <Container className='d-flex mb-3 flex-column justify-content-space-between' >
        <div className='mb-3'><Button variant="outline-success" onClick={()=>setModVis(true)}>Создать запись</Button></div>
        <RuchkaTable/>  
    </Container >

        :
    <Container className='d-flex  mb-3'>
        <RuchkaTable/>  
    </Container >

}

          



       </Container>
    
    
    );
})

export default RuchkaPage;


