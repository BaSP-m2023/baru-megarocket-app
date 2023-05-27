import styles from './table.module.css';
import Item from './Item';

const List = ({ members, handleModal }) => {
  return (
    <table className={`${styles.table}`}>
      <thead className={`${styles['table-header']}`}>
        <tr className={`${styles['table-row']}`}>
          <th>Members</th>
          <th>Membership Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <Item key={member._id} member={member} handleModal={handleModal} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
