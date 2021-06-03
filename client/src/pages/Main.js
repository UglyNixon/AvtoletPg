import React from 'react';
import { Container } from 'react-bootstrap';
import ProductBar from '../components/ProductBar';

const Main = () => {
    return (
  <Container className='d-flex justify-content-center align-items-center flex-wrap' style={{height:window.innerHeight - 54}}>
    <ProductBar/>
  </Container>
    )
};
export default Main;