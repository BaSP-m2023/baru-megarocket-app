import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './subscriptionMember.module.css';

import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import { deleteSubscription } from 'Redux/Subscriptions/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import { Button } from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Loader from 'Components/Shared/Loader';

const SubscriptionsMember = () => {
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const pending = useSelector((state) => state.subscriptions.isPending);
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const { dark } = useSelector((state) => state.darkmode);
  const [idToDelete, setIdToDelete] = useState('');
  const [activeMember, setActiveMember] = useState(null);
  const member = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  useEffect(() => {
    if (member) setActiveMember(member.isActive);
  }, [member]);

  useEffect(() => {
    const filterSubscription = subscriptions.filter((item) => item.members?._id === member._id);
    setSubscription(filterSubscription);
  }, [pending]);

  const handleDeleteActivity = () => {
    dispatch(deleteSubscription(idToDelete));
    setShowConfirmModal(false);
  };

  const handleDeleteButton = (id) => {
    setShowConfirmModal(true);
    setIdToDelete(id);
  };

  return (
    <>
      {pending && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {!pending && !activeMember && (
        <p className={!dark ? styles.text : styles.darkText}>
          Your membership is not active, please go to your nearest branch to activate it
        </p>
      )}
      {!pending && activeMember && (
        <div className={!dark ? styles.container : styles.darkContainer}>
          <h2 className={styles.title}>Your subscriptions</h2>
          {subscription.length !== 0 ? (
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Activity</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Day</th>
                  <th className={styles.th}>Time</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody data-testid="subscriptions-list">
                {subscription?.map((item) => {
                  return (
                    <tr className={styles.tr} key={item.members_id}>
                      <td className={styles.td}>{item.classes.activity.name}</td>
                      <td className={styles.td}>{item.date.slice(0, 10)}</td>
                      <td className={styles.td}>{item.classes.day}</td>
                      <td className={styles.td}>{item.classes.time}</td>

                      <td className={styles.button}>
                        <div className={styles.buttonContainer}>
                          <Button
                            text="Unsubscribe"
                            classNameButton="deleteButton"
                            action={() => handleDeleteButton(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className={styles.text}>You dont have any subscription</p>
          )}
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          handler={() => setShowConfirmModal(false)}
          title="Unsubscribe Activity"
          reason="delete"
          onAction={handleDeleteActivity}
        >
          Are you sure you want to unsubscribe activity?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </>
  );
};

export default SubscriptionsMember;
