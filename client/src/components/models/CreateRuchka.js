import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';

const CreateRuchka = observer(({show,onHide}) => {


    return ( 
       
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
        Добавить ручку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
    <Form>
        
    </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Добавить</Button>
        <Button variant="warning" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
})

export default CreateRuchka;