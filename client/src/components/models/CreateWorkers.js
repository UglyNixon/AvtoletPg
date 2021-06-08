import React from 'react';
import { Button, Dropdown, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';

const CreateWorkers = ({show,onHide}) => {


    return ( 
       
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Добавить работника
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
    <Form>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Имя</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите имя'
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Фамилия</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите имя'
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Код</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите имя'
    />
    </InputGroup>

    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Подразделение</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder='Введите имя'
    />
    </InputGroup>

    </Form>






      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Добавить</Button>
        <Button variant="warning" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
        
    );
};

export default CreateWorkers;