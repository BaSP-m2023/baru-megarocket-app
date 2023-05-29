import React from 'react';
import './table.module.css';
import pencil from './assets/pencil.png';
import trash from './assets/trash.svg';
import plus from './assets/plus.svg';

const Table = ({ data, deleteItem, updateItem, onAdd /*, onEdit*/ }) => {
  return (
    <>
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
                  <button onClick={/*onEdit*/ () => updateItem(item._id)}>
                    <img src={pencil} width="20px"></img>
                  </button>
                  <button onClick={() => deleteItem(item._id)}>
                    <img src={trash} width="20px"></img>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <img src={plus} width="40px" onClick={onAdd}></img>
    </>
  );
};

export default Table;
