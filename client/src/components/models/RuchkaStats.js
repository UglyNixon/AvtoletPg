import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

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
        
    
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="warning" onClick={()=>onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default RuchkaStats;