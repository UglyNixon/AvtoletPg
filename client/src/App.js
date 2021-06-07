import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userApi';

const App = observer(() => {
  const {user}=useContext(Context)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{ check()
      .then(data=>{
        user.setUser(data)
        user.setIsAuth(true)
      })
      .finally(()=>setLoading(false))},2000)
   
  },[])
  if (loading) {
    return    (
     <Container  className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

     <Spinner animation="grow" variant="dark" />
     </Container>
    )
  }else 
  return (
  <BrowserRouter>
    <NavBar/>
    <AppRouter/>
  </BrowserRouter>
  );
})
export default App;
