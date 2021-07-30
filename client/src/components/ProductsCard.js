import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const ProductsCard = (product) => {
    const history = useHistory()
    
    return (
        <Card style={{cursor:'pointer'}} onClick={()=>history.push(product.product.title)}>
        <Card.Img variant="top" src={product.product.img} />
        <Card.Body>
          <Card.Title style={{textAlign:'center'}}>{product.product.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{product.product.img}</small>
        </Card.Footer>
      </Card>
    );
};

export default ProductsCard;