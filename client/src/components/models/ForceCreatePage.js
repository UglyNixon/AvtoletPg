import { observer } from 'mobx-react-lite';

import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, InputGroup, Modal, Row, Tab, Tabs, FormControl } from 'react-bootstrap';

import { Context } from '../..';

import { fetchBackup,  fetchProducts, forceBackup,saveBackup } from '../../http/ProductApi';

const ForceCreatePage =observer(({show,onHide})  => {
    const [file,setFile] =useState(null)
    const [key,setKey] =useState('backupForce')
    const [backProdId,setBackProdId]=useState(undefined)
    const {product}=useContext(Context)
    const selectedFile=e=>{
      setFile(e.target.files[0])
    }

    const clickCreate=()=>{
       
      const formData = new FormData()
      formData.append('id',product.selectedBackup.id)
      formData.append('tableName',product.selectedProduct.title)
      forceBackup(formData)
    
    }

    const clickSaveBackup = ()=> {

      saveBackup('егор')

    }



    useEffect(()=>{
        fetchProducts()
        .then(data=>product.setProducts(data))
        fetchBackup()
        .then(data=>product.setBackup(data))
       
    },[])
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
          Создание таблицы
          </Modal.Title>
        </Modal.Header>

          
        <Modal.Body>
        <Tabs defaultActiveKey="backupForce" id="tabForce" className="mb-3" onSelect={(k)=>setKey(k)}>


   {/*         ********************             */}
       <Tab eventKey="backupForce" title="Выбрать версию" style={{height:200,paddingTop:15}}  >
       <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Продукт:</InputGroup.Text>
    <Dropdown className='ml-2'>
   <Dropdown.Toggle variant="success" id="dropdown-basic">
    {product.selectedProduct.title||'Выберите продукт'}
   </Dropdown.Toggle>

    <Dropdown.Menu>
        { product.products.map((item)=><Dropdown.Item  key={item.id} onClick={()=>{product.setSelectedProduct(item);setBackProdId(product.selectedProduct.id);product.setSelectedBackup({})}}>{item.title} </Dropdown.Item>)}
    </Dropdown.Menu>

</Dropdown>
    </InputGroup>
    {backProdId ?
 
      <InputGroup className="mb-3 align-content-center">
        <InputGroup.Text id="inputGroup-sizing-default">Дата:</InputGroup.Text>
        <Dropdown className='ml-2'>
         <Dropdown.Toggle variant="success" id="dropdown-basic">
         {product.selectedBackup.date ?`${product.selectedBackup.date} ver.${product.selectedBackup.id}`:'Выберите дату'}
          </Dropdown.Toggle>

        <Dropdown.Menu>
        {product.backups.filter(item=>item.productId==product.selectedProduct['id']).map(item=><Dropdown.Item  
        key={item.id} 
        onClick={()=>{product.setSelectedBackup(item);}}
        >{`${item.date} ver.${item.id}`} </Dropdown.Item>)}
        </Dropdown.Menu>
       
        </Dropdown>
      
    </InputGroup>
    :
<div></div>
    }
    <hr
        style={{
            height: 1
        }}
    />
    <div> 
      {product.selectedBackup.date?
       product.selectedBackup.jsonData.length ?
      `Записей : ${product.selectedBackup.jsonData.length} шт.`: `Неверный формат или ошибка в backup файле` :
      "Backup не выбран"
    }
    </div>
       </Tab>


         {/*         ********************             */}


        <Tab eventKey="fileForce" title="Загрузить из файла" style={{height:200,paddingTop:15}} >
     <Form>
      <InputGroup  className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Выберите файл : </InputGroup.Text>
    <div className='ml-3 '>   <Form.Control
            className='mt-3'
        type='file'
        onChange={selectedFile}
            /></div>
    </InputGroup>    
  
      </Form>
  </Tab>
 
   {/*         ********************             */}

  <Tab eventKey="SaveTable" title="Сохранить таблицу" style={{height:200,paddingTop:15}} >
  <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Продукт:</InputGroup.Text>
    <Dropdown className='ml-2'>
   <Dropdown.Toggle variant="success" id="dropdown-basic">
    {product.selectedProduct.title||'Выберите продукт'}
   </Dropdown.Toggle>

    <Dropdown.Menu>
        { product.products.map((item)=><Dropdown.Item  key={item.id} onClick={()=>{product.setSelectedProduct(item);setBackProdId(product.selectedProduct.id)}}>{item.title} </Dropdown.Item>)}
    </Dropdown.Menu>

</Dropdown>
    </InputGroup>
    <InputGroup className="mb-3">
      <Row>
      <Col style={{width:'90px',flexGrow:1}}>
    <InputGroup.Text>Дата :</InputGroup.Text>
    </Col>
    <Col style={{width:'48px',padding:0,flexGrow:1}}>
    <FormControl placeholder={'мм'} maxlength={2} />
    </Col>
    <Col style={{width:'30px',padding:0,flexGrow:0}}>
    <InputGroup.Text>/</InputGroup.Text>
    </Col>
    <Col style={{width:'48px',padding:0,flexGrow:1}}>
    <FormControl  placeholder={'гг'} maxlength={2}/>
    </Col>
  
    </Row>
  </InputGroup>
    
  </Tab>
  
</Tabs>
      
        </Modal.Body>
        <Modal.Footer>
          {
              key =='backupForce' ?
                <Button variant="success" onClick={()=>clickCreate()}>Создать таблицу</Button>
               :
               key =='fileForce' ? 
               <Button variant="success" >Сохранить из файла</Button>
               :
               <Button variant="success" onClick={()=>clickSaveBackup()} >Сделать Backup таблицы</Button>

    
          }
               
                
               
  
          <Button variant="warning" onClick={()=>{onHide()}}>Закрыть</Button>
        
        </Modal.Footer>
      </Modal>
    );
})

export default ForceCreatePage;