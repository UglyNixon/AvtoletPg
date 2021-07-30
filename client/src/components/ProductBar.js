import React, { useContext, } from 'react';
import {  CardGroup,  } from 'react-bootstrap';
import { useHistory } from 'react-router';
import {Context} from '../index'
import ProductsCard from './ProductsCard';

const ProductBar = () => {
    const {product} = useContext(Context)
    const history=useHistory()
    return (
     
            <CardGroup>
               
                          {product.products.map(prod=>
                            <ProductsCard key={prod.id} product={prod} onClick={()=>history.push(`/${prod.title}`)}/>)} 
    
            </CardGroup>

     
    );
};

export default ProductBar;