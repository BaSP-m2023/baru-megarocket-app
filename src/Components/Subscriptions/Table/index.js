import { useState, useEffect, useRef } from 'react';
import styles from './table.module.css';
import imgDeleteSubscription from '../assets/delete-icon.png';
import imgEditSubscription from '../assets/edit-icon.png';
import Form from '../Form';
import { DeleteModal } from '../Modals/index';

const Table = ({ data }) => {
  const [deletedSubscription, setDeletedSubscription] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const filteredData = data.filter(
      (subscription) => !deletedSubscription.includes(subscription._id)
    );
    setUpdatedData(filteredData);
  }, [data, deletedSubscription]);

  const handleEdit = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (event, subscriptionId) => {
    event.stopPropagation();
    try {
      await deleteSubscription(subscriptionId);
      setDeletedSubscription([...deletedSubscription, subscriptionId]);
      setShowDeleteModal(true);
    } catch (error) {
      console.error('Error', error);
    }
  };
  const deleteSubscription = async (subscriptionId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${subscriptionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('Error', error);
    }
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
          {updatedData.length > 0 ? (
            updatedData.map((subscription, index) => (
              <tr className={styles.line} key={`${subscription._id}-${index}`}>
                <td
                  className={styles.item}
                >{`${subscription.classes.day} ${subscription.classes.time}`}</td>
                {!subscription.members ? (
                  <td className={styles.item}>{'empty'}</td>
                ) : (
                  <td
                    className={styles.item}
                  >{`${subscription.members.name} ${subscription.members.lastName}`}</td>
                )}
                <td className={styles.item}>{subscription.date}</td>
                <td onClick={() => handleEdit(subscription._id)}>
                  <img src={imgEditSubscription}></img>
                </td>
                <td onClick={(event) => handleDelete(event, subscription._id)}>
                  <img src={imgDeleteSubscription}></img>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cannot find any subscription</td>
            </tr>
          )}
        </tbody>
      </table>
      <div ref={formRef}>
        {editingSubscriptionId && <Form subscriptionId={editingSubscriptionId} />}
      </div>
      {showDeleteModal ? <DeleteModal onClose={closeModal} /> : <div></div>}
    </div>
  );
};
export default Table;
