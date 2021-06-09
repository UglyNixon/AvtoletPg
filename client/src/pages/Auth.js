import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import { Context } from '..';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE } from '../utils/constant';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history =useHistory();
    const isLogin = location.pathname===LOGIN_ROUTE
    const [loginVal,setLogin]= useState('')
    const [password,setPassword]=useState('')
    const authFunc = async ()=>{
            try {
                let data;
        if (isLogin) {
            data = await login(loginVal,password);
            console.log(data)

    }else {
        data = await registration(loginVal,password);
            console.log(data)
    }
    user.setUser(data)
    user.setIsAuth(true)
    history.push(MAINPAGE_ROUTE)
            } catch (error) {
                alert(error.response.data.message)
            }

        
    }
    return (
        <div>
        <Container className='d-flex justify-content-center align-items-center' style={{height:window.innerHeight - 54}}>

           <Card style={{width:600}} className='p-5'>
               <h2 className='m-auto'>{isLogin?'Авторизация':'Регистрация'}</h2>
            <Form className='d-flex flex-column'
> 
<Form.Control className='mt-3' placeholder='Введите Логин' value={loginVal} onChange={e=>setLogin(e.target.value)}/>

<Form.Control className='mt-3' placeholder='Введите Пароль' type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
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
    onClick={authFunc}
    variant='outline-success'> {isLogin ? 'Войти':'Зарегестрироваться'}</Button>
</Row>
            </Form>
           </Card>
        </Container>
        </div>
    );
})

export default Auth;