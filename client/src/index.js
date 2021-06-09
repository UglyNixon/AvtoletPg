import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RuchkaStore from './store/RuchkaStore';
import ProductStore from './store/ProductStore';

import UserStore from './store/UserStore';
export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
    user:new UserStore(),
    product:new ProductStore(),
    ruchki:new RuchkaStore()
  }}>

 <App/>

  </Context.Provider>,
 
     
   
   
   document.getElementById('root')
);





