import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Context } from '../..';

const RuchkaStats = observer(({show,onHide}) => {
  const {ruchki} =useContext(Context)
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
      <thead>
    <tr>
      <th>#</th>
      <th>ФИО</th>
      <th>Собрано /<br/>
      % общего
      </th>
      <th>Долг кол-во /<br/>
       серий
      </th>
      <th>Брак <br/>
      % средний
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</Table>
    
      </Modal.Body>
      <Modal.Footer>
        {ruchki.ruchki[0].series}
        <Button variant="warning" onClick={()=>onHide()}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
    )
})

export default RuchkaStats;