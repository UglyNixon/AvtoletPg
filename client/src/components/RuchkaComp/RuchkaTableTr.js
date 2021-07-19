import React from 'react';
import styles from '../../styles/table.module.css';
const RuchkaTableTr = (props) => {
    const {ruchka,workers} = props;
  
    return (
        <tr>
                <td className={styles.th}>{ruchka.series}</td>
                <td className={styles.th}>{workers.filter(item=>item.id===ruchka.workerId)[0].surname}</td>
                <td className={styles.th}>{ruchka.totalValue}</td>
                <td className={styles.th}>{ruchka.dolg}</td>
                <td className={styles.th}>{ruchka.status?'Сдано':'В работе'}</td>
                <td className={styles.th}>{ruchka.brak}</td> 
                <td className={styles.th}>{ruchka.date}</td>




        </tr>
    );
};

export default RuchkaTableTr;