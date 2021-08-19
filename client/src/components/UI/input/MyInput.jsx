import React from 'react';
import MyLabel from '../label/MyLabel';
import cl from './MyInput.module.css'
const MyInput = ({...props}) => {
    return (
        <div className={cl[props.flextype]} >
        <MyLabel>{props.label}</MyLabel>
        <input {...props} className={cl.MyInput__imp} type="text" />
        </div>
    );
};

export default MyInput;