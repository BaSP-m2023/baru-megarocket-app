import styles from './subscriptions.module.css';
import { useState, useEffect } from 'react';
import Form from './Form';
import DeleteModal from './Modals/deleteModal';

function Subscriptions() {
  const [subscriptions, editSubscription] = useState([]);
  const [editSubscriptionId, setEditSubscriptionId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      const jsonSubscriptions = data.data;
      editSubscription(jsonSubscriptions);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleEdit = (subscriptionId) => {
    setEditSubscriptionId(subscriptionId);
  };

  const handleDelete = async (event, subscriptionId) => {
    event.stopPropagation();
    try {
      await deleteSubscription(subscriptionId);
      editSubscription(subscriptions.filter((subscription) => subscription._id !== subscriptionId));
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
      editSubscription(
        subscriptions.filter((subscriptions) => subscriptions._id !== subscriptionId)
      );
    } catch (error) {
      console.log('Error', error);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <section className={styles.container}>
      <h1>Subscription List</h1>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Member</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <tr key={subscription._id} onClick={() => handleEdit(subscription._id)}>
                <td>{subscription.classes._id}</td>
                <td>
                  {subscription.members &&
                    subscription.members.name + subscription.members.lastName}
                </td>
                <td>{subscription.date}</td>
                <td>
                  <button
                    className={styles.btnDelete}
                    onClick={(event) => {
                      handleDelete(event, subscription._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay suscripciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      {editSubscriptionId && <Form subscriptionId={editSubscriptionId} />}
      <DeleteModal
        show={showDeleteModal}
        closeModal={closeModal}
        title="Delete Subscription"
        message="Subscription has been deleted"
      />
    </section>
  );
}
export default Subscriptions;
