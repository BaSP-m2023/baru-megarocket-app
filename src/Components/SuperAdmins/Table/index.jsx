import styles from './table.module.css';
import pencil from '../assets/edit-icon.png';
import trash from '../assets/delete-icon.png';
import plus from '../assets/plus.png';
import { Link } from 'react-router-dom';

const Table = ({ deleteItem, data }) => {
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
          {data.map((item) => {
            return (
              <tr key={item._id} className={styles.trow}>
                <td className={styles.tdata}>{item.name}</td>
                <td className={styles.tdata}>{item.lastName}</td>
                <td className={styles.tdata}>{item.email}</td>
                <td className={styles.tdata}>{item.password}</td>
                <td>
                  <Link to={{ pathname: `super-admins/form/${item._id}` }}>
                    <button className={styles.button}>
                      <img src={pencil} width="20px"></img>
                    </button>
                  </Link>
                  <button className={styles.button} onClick={() => deleteItem(item._id)}>
                    <img src={trash} width="20px"></img>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={{ pathname: 'super-admins/form' }}>
        <button className={styles.addItem}>
          <img className={styles.plus} src={plus}></img>
          Add new
        </button>
      </Link>
    </>
  );
};

export default Table;
