import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RuchkaStore from './store/RuchkaStore';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
    user:new UserStore(),
    product:new ProductStore(),
    ruchki:new RuchkaStore(),
    device:new DeviceStore()
  }}>

 <App/>

  </Context.Provider>,
 
     
   
   
   document.getElementById('root')
);





