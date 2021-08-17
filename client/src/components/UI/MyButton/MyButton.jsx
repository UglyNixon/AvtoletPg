import React from 'react';
import cl from './myButton.module.css';

const MyButton = ({children,...props}) => {
    const type = props.type
    return (
        <div>
<button style={props.style} className={[cl.button,cl[type]].join(' ')}>{children}</button>
        </div>
        
    );
};

export default MyButton;