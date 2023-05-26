import React from 'react';
import './table.module.css';
import pencil from './assets/pencil.png';
import trash from './assets/trash.svg';

const Table = ({ data, deleteItem }) => {
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
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <img src={pencil} width="20px"></img>
                <button onClick={() => deleteItem(item._id)}>
                  <img src={trash} width="20px"></img>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
