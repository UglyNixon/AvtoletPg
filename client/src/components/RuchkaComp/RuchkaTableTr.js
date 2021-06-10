import React, { useEffect } from 'react';

const RuchkaTableTr = (props) => {
    const {ruchka,workers} = props;
  
    return (
        <tr>
                <td>{ruchka.series}</td>
                <td>{workers.filter(item=>item.id===ruchka.workerId)[0].surname}</td>
                <td>{ruchka.totalValue}</td>
                <td>{ruchka.dolg}</td>
                <td>{ruchka.status?'Сдано':'В работе'}</td>
                <td>{ruchka.brak}</td> 
                <td>{ruchka.date}</td>




        </tr>
    );
};

export default RuchkaTableTr;