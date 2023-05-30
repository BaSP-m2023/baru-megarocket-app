import styles from './table.module.css';
import pencil from '../assets/edit-icon.png';
import trash from '../assets/delete-icon.png';
import plus from '../assets/plus.png';

const Table = ({ data, deleteItem, showForm, handleUpdateClick }) => {
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
              <>
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
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
        <img src={plus}></img>
        Add new
      </button>
    </>
  );
};

export default Table;
