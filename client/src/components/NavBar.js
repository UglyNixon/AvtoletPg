import React, { useContext } from 'react';
import {Navbar,Form,Nav, FormControl, Button} from "react-bootstrap"
import {NavLink,Link, useHistory} from 'react-router-dom'
import { ADMIN_ROUTE, CHIP_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, PASSPORT_ROUTE, RUCHKA_ROUTE } from '../utils/constant';
import styles from '../styles/mystyle.module.css';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const NavBar = observer(() => {
    const history=useHistory()
    const {user} = useContext(Context);
    const outFunc= ()=>{
     user.setUser({});
     user.setIsAuth(false);
     localStorage.removeItem('token')
    }
    return (
    
    <Navbar bg="dark" variant="dark">

    <Link to={MAINPAGE_ROUTE} className={styles.links}>HOME</Link>
    <Nav   className="mr-auto ml-5">
    <NavLink to={RUCHKA_ROUTE} className={styles.links}>Ручки</NavLink>
    <NavLink to={CHIP_ROUTE} className={styles.links}>Платы</NavLink>
    <NavLink to={PASSPORT_ROUTE} className={styles.links}>Паспорта</NavLink>
    </Nav>
    <Form inline>
     {user.isAuth ?
                <Nav>
                <Button variant="outline-light" className='ml-3' onClick={()=>history.push(ADMIN_ROUTE)}>Админ панель</Button>
                <Button variant="outline-light" className='ml-3' onClick={()=>outFunc()}>Выход</Button>
                </Nav>
                :
                <Nav>
               
                <Button variant="outline-light" className='ml-3' onClick={()=>history.push(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
     }
    </Form>
  </Navbar>
    
    );
})

export default NavBar;