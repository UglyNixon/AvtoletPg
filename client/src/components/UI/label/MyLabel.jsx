import React from 'react';
import cl from './MyLabel.module.css'
const MyLabel = ({children,...props}) => {
    return (
      <label  className ={cl.MyLabel} {...props}>{children}</label>
    );
};

export default MyLabel;