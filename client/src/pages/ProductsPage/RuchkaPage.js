import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '../..';
import RuchkaTable from '../../components/RuchkaComp/RuchkaTable';

const RuchkaPage = () => {
    const {product}= useContext(Context)
    
    return (
       <Container style={{marginTop:'25%'}}>
           <RuchkaTable/>
       </Container>
    );
};

export default RuchkaPage;