import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { WORKER_ROUTE } from '../../utils/constant';

const PersonalItem = ({worker}) => {
    const history=useHistory()
    return (
        <Card 
        className='mt-2 ml-2' 
        style={{ width: '18rem' ,cursor:'pointer'}}
        onClick={()=>history.push(WORKER_ROUTE+'/'+worker.id)}
        >
             <Card.Body>
              <Card.Title>{`${worker.surname} ${worker.name} 2`}</Card.Title>
              <hr/>
              <Card.Text>
                {`Код: ${worker.code}`}
             </Card.Text>
    
  </Card.Body>
</Card>
    );
};

export default PersonalItem;