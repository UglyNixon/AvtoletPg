import React, { useContext } from 'react';
import {Navbar,Form,Nav, FormControl, Button} from "react-bootstrap"
import {NavLink, useHistory} from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/constant';
import styles from '../styles/mystyle.module.css';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const NavBar = observer(() => {
    const history=useHistory()
    const {user} = useContext(Context);

    function outFunc(){
     user.setUser({});
     user.setIsAuth(false);
     localStorage.removeItem('token')
    }
    return (
    
    <Navbar bg="dark" variant="dark">
        <NavLink to={MAIN_ROUTE} className={styles.links}>Home</NavLink>
    <Nav   className="mr-auto ml-5">
    <NavLink to={MAIN_ROUTE} className={styles.links}>Ручки</NavLink>
    <NavLink to={MAIN_ROUTE} className={styles.links}>Платы</NavLink>
    <NavLink to={MAIN_ROUTE} className={styles.links}>Паспорта</NavLink>
    </Nav>
    <Form inline>
     {user.isAuth ?
                <Nav>
                <Button variant="outline-light" className='ml-3'>Админ панель</Button>
                <Button variant="outline-light" className='ml-3' onClick={outFunc}>Выход</Button>
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