import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Container} from 'react-bootstrap';
import { Context } from '../..';

import RuchkaTable from '../../components/RuchkaComp/RuchkaTable';


const RuchkaPage = observer(() => {
    
    const {user}= useContext(Context)
    
    return (

      <Container style={{marginTop:'5%',marginLeft:0}}>
      
{user.isAuth?
    <Container className='d-flex mb-3 flex-column justify-content-space-between' >
        
            <div>
            <RuchkaTable/>  
            </div>
    
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


