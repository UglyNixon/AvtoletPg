import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const RuchkaStats = observer(({show,onHide}) => {
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
        Статистика по сборщикам
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
  
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
    
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="warning" onClick={()=>onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default RuchkaStats;