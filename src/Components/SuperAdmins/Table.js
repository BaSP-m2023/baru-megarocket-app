import React from 'react';
import styles from './table.module.css';
import pencil from './assets/pencil.png';
import trash from './assets/trash.svg';

const Table = () => {
  return (
    <table>
      <thead className={styles.caca}>
        <tr>
          <th>Name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Password</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Victoria</td>
          <td>Ecalle</td>
          <td>victoria@gmail.com</td>
          <td>holachau123</td>
          <td>
            <img src={pencil} width="20px"></img>
            <img src={trash} width="20px"></img>
          </td>
        </tr>
        <tr>
          <td>Victoria</td>
          <td>Ecalle</td>
          <td>victoria@gmail.com</td>
          <td>holachau123</td>
          <td>
            <img src={pencil} width="20px"></img>
            <img src={trash} width="20px"></img>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
