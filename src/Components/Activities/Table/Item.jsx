import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './table.module.css';

const Item = ({ activity }) => {
  let { url } = useRouteMatch();
  return (
    <tr className={`${styles['table-row']}`}>
      <td>{activity.name}</td>
      <td>{activity.description}</td>
      <td>{activity.isActive ? 'Active' : 'Deactive'}</td>
      <td>
        <Link to={`${url}/edit/${activity._id}`}>
          <img
            className={`${styles['table-buttons']}`}
            src="/assets/images/edit-icon.png"
            alt="edit icon"
          />
        </Link>
      </td>
      <td>
        <img
          className={`${styles['table-buttons']}`}
          src="/assets/images/delete-icon.png"
          alt="delete icon"
        />
      </td>
    </tr>
  );
};

export default Item;
