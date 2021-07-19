import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Context } from '..';
import ProductBar from '../components/ProductBar';
import { fetchProducts } from '../http/ProductApi';

const Main = () => {
  const{product} = useContext(Context)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    fetchProducts().then(data=>product.setProducts(data)).finally(()=>setLoading(false))
},[])
if (loading) {
return (
<Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

<Spinner animation="grow" variant="dark" />
</Container>

)

}else {

    return (
 
   <Container className='d-flex justify-content-center align-items-center flex-wrap' style={{height:window.innerHeight - 54}}>
    <ProductBar products={product.products}/>
  </Container>
    )
}
};
export default Main;