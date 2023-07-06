import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './table.module.css';
import { deleteSubscription } from 'Redux/Subscriptions/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';
import Loader from 'Components/Shared/Loader';
import { Input } from 'Components/Shared/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Table = ({ data }) => {
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState('');
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.subscriptions.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  const handleConfirmDelete = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = (subscriptionId) => {
    dispatch(deleteSubscription(subscriptionId));
    setShowConfirmDeleteModal(false);
  };

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

  const closeModal = () => {
    setShowConfirmDeleteModal(false);
  };

  if (pending) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  return (
    <div>
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
      <div className={styles.container}>
        <table className={styles.tableSubscription}>
          <thead className={styles.containerThead}>
            <tr className={styles.thead}>
              <th>Classes</th>
              <th>Date</th>
              <th>Members</th>
              <th>Creation Date</th>
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
                <td className={`${styles.itemButton} ${styles.itemButtonEdit}`}>
                  <Link to={`/user/admin/subscriptions/edit/${subscription._id}`}>
                    <Button
                      img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'}
                      testid="subscriptions-edit-btn"
                    />
                  </Link>
                </td>
                <td className={`${styles.itemButton} ${styles.itemButtonDelete}`}>
                  <Button
                    img={process.env.PUBLIC_URL + '/assets/images/delete-icon.png'}
                    action={() => handleConfirmDelete(subscription._id)}
                    testid="subscriptions-delete-btn"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filterSubscriptions.length === 0 ? (
        <div className={styles.filter}>
          <p>There is no subscription with that member or activity</p>
        </div>
      ) : (
        ''
      )}
      {showConfirmDeleteModal && (
        <ConfirmModal
          title="Delete Subscription"
          handler={closeModal}
          onAction={() => handleDelete(editingSubscriptionId)}
          reason="delete"
        >
          Are you sure to delete subscription?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast())}
          state={state}
          message={message}
        />
      )}
    </div>
  );
};
export default Table;
