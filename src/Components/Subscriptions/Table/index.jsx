import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './table.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscription } from '../../../Redux/Subscriptions/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import Loader from '../../Shared/Loader';

const Table = ({ data }) => {
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
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
    <div className={styles.container}>
      <table className={styles.tableSubscription}>
        <thead className={styles.containerThead}>
          <tr className={styles.thead}>
            <th>Classes</th>
            <th>Members</th>
            <th>Creation Date</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((subscription) => (
              <tr key={subscription._id} className={styles.item}>
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
                  <Link to={`/subscriptions/edit/${subscription._id}`}>
                    <Button img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'} />
                  </Link>
                </td>
                <td className={`${styles.itemButton} ${styles.itemButtonDelete}`}>
                  <Button
                    img={process.env.PUBLIC_URL + '/assets/images/delete-icon.png'}
                    action={() => handleConfirmDelete(subscription._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.item}>
              <td colSpan="4">Cannot find any subscription</td>
            </tr>
          )}
        </tbody>
      </table>
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
