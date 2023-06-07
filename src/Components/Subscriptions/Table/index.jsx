import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './table.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';

const Table = ({ data }) => {
  const [deletedSubscription, setDeletedSubscription] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredData = data.filter(
        (subscription) => !deletedSubscription.includes(subscription._id)
      );
      setTableData(filteredData);
    }
    if (showDeleteModal) {
      setTimeout(() => {
        setShowDeleteModal(false);
      }, 3000);
    }
  }, [data, deletedSubscription, showDeleteModal]);

  const handleConfirmDelete = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    setShowConfirmDeleteModal(true);
    setShowDeleteModal(false);
  };

  const handleDelete = async (subscriptionId) => {
    try {
      await deleteSubscription(subscriptionId);
      setDeletedSubscription([...deletedSubscription, subscriptionId]);
      setShowDeleteModal(true);
      setShowConfirmDeleteModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteSubscription = async (subscriptionId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${subscriptionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const closeModal = () => {
    setShowConfirmDeleteModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      <table className={styles.tableSubscription}>
        <thead className={styles.containerThead}>
          <tr className={styles.thead}>
            <th>Classes</th>
            <th>Members</th>
            <th>Date</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((subscription) => (
              <tr key={subscription._id} className={styles.item}>
                <td>{`${subscription.classes.day} ${subscription.classes.time}`}</td>
                {!subscription.members ? (
                  <td>{'empty'}</td>
                ) : (
                  <td>{`${subscription.members.name} ${subscription.members.lastName}`}</td>
                )}
                <td>{formatDate(subscription.date)}</td>
                <td className={`${styles.itemButton} ${styles.itemButtonEdit}`}>
                  <Link to={`/subscriptions/edit/${subscription._id}`}>
                    <Button
                      img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'}
                      action={() => history.push(subscription._id)}
                    />
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
      {showDeleteModal && (
        <ResponseModal handler={closeModal} state="success" message="Subscription Deleted" />
      )}
    </div>
  );
};
export default Table;
