import React from 'react';
import './table.module.css';
import pencil from './assets/pencil.png';
import trash from './assets/trash.svg';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Password</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <img src={pencil} width="20px"></img>
                <img src={trash} width="20px"></img>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
