import styles from './table.module.css';
import pencil from '../assets/edit-icon.png';
import trash from '../assets/delete-icon.png';
import plus from '../assets/plus.png';

const Table = ({ data, deleteItem, showForm, handleUpdateClick }) => {
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
              <>
                <tr key={item._id} className={styles.trow}>
                  <td className={styles.tdata}>{item.name}</td>
                  <td className={styles.tdata}>{item.lastName}</td>
                  <td className={styles.tdata}>{item.email}</td>
                  <td className={styles.tdata}>{item.password}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(item._id)}>
                      <img src={pencil} width="20px"></img>
                    </button>
                    <button onClick={() => deleteItem(item._id)}>
                      <img src={trash} width="20px"></img>
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <button className={styles.addItem} onClick={showForm}>
        <img className={styles.plus} src={plus}></img>
        Add new
      </button>
    </>
  );
};

export default Table;
