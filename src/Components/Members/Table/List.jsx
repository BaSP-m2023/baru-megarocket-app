import styles from './table.module.css';
import Item from './Item';
import { useState } from 'react';

const List = ({ members = [], handleModal }) => {
  const [filter, setFilter] = useState(members);

  const filterList = (value) => {
    const membersToShow = members.filter((member) =>
      member.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilter(membersToShow);
  };
  return (
    <div className={`${styles['table-container']}`}>
      <div className={`${styles['table-filter']}`}>
        <input
          className={`${styles['input-filter']}`}
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterList(e.target.value)}
        />
        <img src="/assets/images/search-icon.png" alt="" />
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles['table-header']}`}>
          <tr className={`${styles['table-row']}`}>
            <th>Members</th>
            <th>Membership Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filter.map((member) => (
            <Item key={member._id} member={member} handleModal={handleModal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
