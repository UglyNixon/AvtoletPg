import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { Check } from '../../helpers/littleFunc';


const RuchkaEdit = observer(({show,onHide,workers,ruchki}) => {
  const errorStyle={
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
  }
 
  const inputChange = (value)=>{
   if(! Check.series(value,value.length)) return
     // if(!Check.series(value,value.length)) setError(errorStyle) вариант для подчеркивания
    //  ну и переписать проверку
    
     setSerSearch(value)
  
  }
  const [serSearch,setSerSearch]=useState('')
  const [error,setError] = useState({})
    return ( 
      <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Редактировать запись
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
        <Col md={8}>
          <Form.Control 
          type="text" 
           value={serSearch}
            placeholder='Введите серию'
            maxLength={6}
             onChange={e=>inputChange(e.target.value)}
             aria-describedby="seriesIII"
             style={error}
             />
             
               <Form.Text id="seriesIII" muted>
     6 цифр год+номер (XXYYYY)
  </Form.Text>
             </Col>
        <Col md={4}><Button onClick={()=>console.log(serSearch)}>Найти данные</Button></Col>
        
      </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
        
    
)

export default RuchkaEdit;