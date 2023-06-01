import { useState, useEffect, useRef } from 'react';
import styles from './table.module.css';
import Form from '../Form';
import { DeleteModal, ConfirmDeleteModal } from '../Modals/index';
const imgDeleteSubscription = process.env.PUBLIC_URL + '/assets/images/delete-icon.png';
const imgEditSubscription = process.env.PUBLIC_URL + '/assets/images/edit-icon.png';

const Table = ({ data }) => {
  const [deletedSubscription, setDeletedSubscription] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredData = data.filter(
        (subscription) => !deletedSubscription.includes(subscription._id)
      );
      setTableData(filteredData);
    }
  }, [data, deletedSubscription]);

  const handleEdit = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    setShowForm(true);
  };

  const updateTableData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setTableData(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleConfirmDelete = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    setShowConfirmDeleteModal(true);
    setShowDeleteModal(false);
  };

  const handleDelete = async (subscriptionId) => {
    try {
      await deleteSubscription(subscriptionId);
      setDeletedSubscription([...deletedSubscription, subscriptionId]);
      setShowConfirmDeleteModal(false);
      setShowDeleteModal(true);
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
    setShowDeleteModal(false);
  };

  return (
    <div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Classes</th>
            <th>Members</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((subscription) => (
              <tr className={styles.line} key={subscription._id}>
                <td
                  className={`${styles.item} ${styles.td}`}
                >{`${subscription.classes.day} ${subscription.classes.time}`}</td>
                {!subscription.members ? (
                  <td className={`${styles.item} ${styles.td}`}>{'empty'}</td>
                ) : (
                  <td
                    className={`${styles.item} ${styles.td}`}
                  >{`${subscription.members.name} ${subscription.members.lastName}`}</td>
                )}
                <td className={`${styles.item} ${styles.td}`}>{formatDate(subscription.date)}</td>
                <td
                  className={`${styles.btnEdit} ${styles.td}`}
                  onClick={() => handleEdit(subscription._id)}
                >
                  <img src={imgEditSubscription}></img>
                </td>
                <td
                  className={`${styles.btnDelete} ${styles.td}`}
                  onClick={() => handleConfirmDelete(subscription._id)}
                >
                  <img src={imgDeleteSubscription}></img>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className={styles.td} colSpan="4">
                Cannot find any subscription
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showForm && (
        <div ref={formRef}>
          {editingSubscriptionId && (
            <Form
              subscriptionId={editingSubscriptionId}
              onClose={() => setShowForm(false)}
              onModalClose={() => setShowForm(false)}
              showForm={showForm}
              updateTable={updateTableData}
            />
          )}
        </div>
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setShowConfirmDeleteModal(false)}
          confirmDelete={() => handleDelete(editingSubscriptionId)}
        />
      )}
      {showDeleteModal ? <DeleteModal onClose={closeModal} /> : <div></div>}
    </div>
  );
};
export default Table;
