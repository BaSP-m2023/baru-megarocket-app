import styles from './table.module.css';
import Item from './Item';
import { useEffect, useState } from 'react';

const List = ({ members = [], handleModal, handleEdit }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(members);
  }, [members]);

  const filterList = (value) => {
    const membersToShow = members.filter(
      (member) =>
        member.name.toLowerCase().includes(value) || member.lastName.toLowerCase().includes(value)
    );
    setFilter(membersToShow);
  };

  return (
    <div className={`${styles['table-container']}`}>
      <div className={`${styles['table-filter']}`}>
        {filter.length === 0 ? (
          <p className={`${styles['table-error']}`}>There is nothing to match</p>
        ) : (
          ''
        )}
        <input
          className={`${styles['table-input-filter']}`}
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterList(e.target.value.toLowerCase())}
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
            <Item
              key={member._id}
              member={member}
              handleModal={handleModal}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
