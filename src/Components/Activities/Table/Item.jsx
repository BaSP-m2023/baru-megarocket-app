import React from 'react';
import styles from './table.module.css';

const Item = ({ activity, handleDelete, handleForm }) => {
  const { _id, name, description, isActive } = activity;
  return (
    <tr className={`${styles['table-row']}`}>
      <td>{activity.name}</td>
      <td>{activity.description}</td>
      <td>{activity.isActive ? 'Active' : 'Deactive'}</td>
      <td>
        <img
          className={`${styles['table-buttons']}`}
          src="/assets/images/edit-icon.png"
          alt="edit icon"
          onClick={() => handleForm({ _id, name, description, isActive })}
        />
      </td>
      <td>
        <img
          className={`${styles['table-buttons']}`}
          src="/assets/images/delete-icon.png"
          alt="delete icon"
          onClick={() => handleDelete({ _id, name })}
        />
      </td>
    </tr>
  );
};

export default Item;
