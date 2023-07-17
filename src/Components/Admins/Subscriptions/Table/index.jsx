import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './table.module.css';

import Loader from 'Components/Shared/Loader';
import { Input } from 'Components/Shared/Inputs';

const Table = ({ data }) => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState('');
  const pending = useSelector((state) => state.subscriptions.isPending);
  const { dark } = useSelector((state) => state.darkmode);

  const filterSubscriptions = useMemo(() => {
    return data.filter((subscription) => {
      const memberName =
        `${subscription.members?.name} ${subscription.members?.lastName}`.toLowerCase();
      const className = `${subscription.classes?.activity?.name}`.toLowerCase();

      return (
        memberName?.includes(filteredSubscriptions) || className?.includes(filteredSubscriptions)
      );
    });
  }, [data, filteredSubscriptions]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (pending) {
    return (
      <div className={styles.containerLoader}>
        <Loader />
      </div>
    );
  }
  return (
    <div className={!dark ? styles.subsContainer : styles.subsDarkContainer}>
      <h1 className={styles.title}>Subscriptions</h1>
      <div className={styles.filterContainer}>
        <div className={styles.inputContainer}>
          <Input
            labelText="Filter Subscription"
            type="text"
            name="filter-subscription"
            placeholder="Search by activities or members"
            change={(e) => setFilteredSubscriptions(e.target.value.toLowerCase())}
          />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </div>
      </div>
      <div className={styles.subTableContainer}>
        <div className={styles.container}>
          <table className={styles.tableSubscription}>
            <thead className={styles.containerThead}>
              <tr className={styles.thead}>
                <th>Classes</th>
                <th>Day & Time</th>
                <th>Members</th>
                <th>Date</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody data-testid="subscriptions-list">
              {filterSubscriptions.map((subscription) => (
                <tr key={subscription._id} className={styles.item}>
                  {!subscription.classes ? (
                    <td>{'empty'}</td>
                  ) : (
                    <td>{`${subscription.classes?.activity?.name}`}</td>
                  )}
                  {!subscription.classes ? (
                    <td>{'empty'}</td>
                  ) : (
                    <td>{`${subscription.classes?.day} ${subscription.classes?.time}`}</td>
                  )}
                  {!subscription.members ? (
                    <td>{'empty'}</td>
                  ) : (
                    <td>{`${subscription.members?.name} ${subscription.members?.lastName}`}</td>
                  )}
                  <td>{formatDate(subscription.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filterSubscriptions.length === 0 ? (
        <div className={dark ? `${styles.filter} ${styles.filterDark}` : `${styles.filter}`}>
          <p>There are not subscriptions to show</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default Table;
