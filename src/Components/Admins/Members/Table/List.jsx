import { useState, useEffect } from 'react';
import styles from './table.module.css';

import Item from './Item';
import { Input } from 'Components/Shared/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const List = ({ members, handleModal }) => {
  const [filter, setFilter] = useState([]);
  const { dark } = useSelector((state) => state.darkmode);

  const filterList = (value) => {
    const membersToShow = members.filter(
      (member) =>
        member.name.toLowerCase().includes(value) || member.lastName.toLowerCase().includes(value)
    );
    setFilter(membersToShow);
  };

  useEffect(() => {
    setFilter(members);
  }, [members]);

  return (
    <div>
      <div className={!dark ? styles.filterContainer : styles.darkFilterContainer}>
        <div className={styles.inputContainer} data-testid="members-search-container">
          <Input
            labelText="Filter Members"
            name="filter-members"
            type="text"
            placeholder="Search by name"
            change={(e) => filterList(e.target.value.toLowerCase())}
          />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </div>
      </div>
      <div className={!dark ? styles.tableContainer : styles.darkTableContainer}>
        <table className={styles.table}>
          <thead className={`${styles['table-header']}`}>
            <tr className={`${styles['table-row']}`}>
              <th>Members</th>
              <th>Membership Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody data-testid="members-list">
            {filter.map((member) => (
              <Item key={member._id} member={member} handleModal={handleModal} />
            ))}
          </tbody>
        </table>
      </div>
      {filter.length === 0 ? (
        <div className={styles.filter}>
          <p>There is no member with that name</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default List;
