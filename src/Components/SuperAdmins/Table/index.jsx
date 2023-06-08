import styles from './table.module.css';
import Button from '../../Shared/Button';
import { Link } from 'react-router-dom';

const Table = ({ confirmDelete, data }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
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
                <td className={styles.actionButtons}>
                  <Link to={{ pathname: `super-admins/edit/${item._id}` }}>
                    <Button img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`} />
                  </Link>
                  <Button
                    img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                    action={() => confirmDelete(item._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/super-admins/add" className={styles.addItem}>
        <Button text={'+ Add new'} classNameButton={'addButton'} />
      </Link>
    </div>
  );
};

export default Table;
