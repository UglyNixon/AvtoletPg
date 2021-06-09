import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '..';
import ProductBar from '../components/ProductBar';
import { fetchProducts } from '../http/ProductApi';

const Main = () => {
  const{product} = useContext(Context)
  useEffect(()=>{
    fetchProducts().then(data=>product.setProducts(data))
},[])
    return (
 
  <Container className='d-flex justify-content-center align-items-center flex-wrap' style={{height:window.innerHeight - 54}}>
    <ProductBar products={product.products}/>
    <div>hi</div>
  </Container>
    )
};
export default Main;