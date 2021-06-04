import React, { useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom'
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constant';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname===LOGIN_ROUTE
    const [login,setLogin]= useState('')
    const [password,setPassword]=useState('')
    const authFunc = async ()=>{
        if (isLogin) {
            const response = await login();
            console.log(response)

    }else {
        const response = await registration();
            console.log(response)
    }
    }
    return (
        <div>
        <Container className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

           <Card style={{width:600}} className='p-5'>
               <h2 className='m-auto'>{isLogin?'Авторизация':'Регистрация'}</h2>
            <Form className='d-flex flex-column'
> 
<Form.Control className='mt-3' placeholder='Введите Логин'/>

<Form.Control className='mt-3' placeholder='Введите Пароль' type="password"/>
<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
{isLogin?

    <div> 
        Нет аккаунта ? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink>
    </div>
            :
            <div> 
        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
    </div>

}
    <Button 
    onclick={authFunc}
    variant='outline-success'> {isLogin ? 'Войти':'Зарегестрироваться'}</Button>
</Row>
            </Form>
           </Card>
        </Container>
        </div>
    );
};

export default Auth;