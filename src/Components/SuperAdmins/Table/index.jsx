/* eslint-disable no-unused-vars */
import styles from './table.module.css';
import pencil from '../assets/edit-icon.png';
import trash from '../assets/delete-icon.png';
import plus from '../assets/plus.png';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Table = ({ deleteItem, showForm, handleUpdateClick }) => {
  const [superadmins, setSuperadmins] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [resMessage, setResMessage] = useState('');

  const getSuperadmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const data = await res.json();
      setSuperadmins(data.data);
    } catch (error) {
      setResMessage(error.message);
      setshowModal(true);
    }
  };
  useEffect(() => {
    getSuperadmins();
  }, []);
  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr className={styles.trow}>
            <th className={styles.thead}>Name</th>
            <th className={styles.thead}>Last name</th>
            <th className={styles.thead}>Email</th>
            <th className={styles.thead}>Password</th>
            <th className={styles.extrathead}></th>
          </tr>
        </thead>
        <tbody>
          {superadmins.map((item) => {
            return (
<<<<<<< HEAD
              <>
                <tr key={item._id} className={styles.trow}>
                  <td className={styles.tdata}>{item.name}</td>
                  <td className={styles.tdata}>{item.lastName}</td>
                  <td className={styles.tdata}>{item.email}</td>
                  <td className={styles.tdata}>{item.password}</td>
                  <td>
                    <Link to={{ pathname: `super-admins/form/${item._id}` }}>
                      <button onClick={() => handleUpdateClick(item._id)}>
                        <img src={pencil} width="20px"></img>
                      </button>
                    </Link>
                    <button onClick={() => deleteItem(item._id)}>
                      <img src={trash} width="20px"></img>
                    </button>
                  </td>
                </tr>
              </>
=======
              <tr key={item._id} className={styles.trow}>
                <td className={styles.tdata}>{item.name}</td>
                <td className={styles.tdata}>{item.lastName}</td>
                <td className={styles.tdata}>{item.email}</td>
                <td className={styles.tdata}>{item.password}</td>
                <td>
                  <button className={styles.button} onClick={() => handleUpdateClick(item._id)}>
                    <img src={pencil} width="20px"></img>
                  </button>
                  <button className={styles.button} onClick={() => deleteItem(item._id)}>
                    <img src={trash} width="20px"></img>
                  </button>
                </td>
              </tr>
>>>>>>> master
            );
          })}
        </tbody>
      </table>
      <Link to={{ pathname: 'super-admins/form' }}>
        <button className={styles.addItem} onClick={showForm}>
          <img className={styles.plus} src={plus}></img>
          Add new
        </button>
      </Link>
    </>
  );
};

export default Table;
