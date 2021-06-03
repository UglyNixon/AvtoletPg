import React, { useContext } from 'react';
import { Card, CardGroup, Container } from 'react-bootstrap';
import {Context} from '../index'
import ProductsCard from './ProductsCard';

const ProductBar = () => {
    const {product} = useContext(Context)
    return (
     
            <CardGroup>
                         {product.product.map(prod=>
                            <ProductsCard key={prod.id} product={prod}/>)}
    
            </CardGroup>

     
    );
};

export default ProductBar;