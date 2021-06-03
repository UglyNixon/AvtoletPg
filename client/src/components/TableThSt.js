import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

const TableTh = observer(() => {
  const [sort,setSort] = useState('возр.')
   return (
          <Dropdown >
                <Dropdown.Toggle >{`${sort}`}</Dropdown.Toggle>
                <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>setSort('убыв.')}>убыв.</Dropdown.Item>
                        <Dropdown.Item onClick={()=>setSort('возр.')}>возр.</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    );
})

export default TableTh;