import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';


const TableTh = observer((props) => {
  const list= props.list
  
        const [title,setTitle] = useState(list[0].code)
        
   return (
          <Dropdown >
                <Dropdown.Toggle style={{width:196}} >{title}</Dropdown.Toggle>
                <Dropdown.Menu>
                      {list.map(wor=>
                              <Dropdown.Item key={wor.code} onClick={()=>setTitle(wor.code)}>{wor.code}</Dropdown.Item>
                      )
                      }
                </Dropdown.Menu>
            </Dropdown>
    );
})

export default TableTh;