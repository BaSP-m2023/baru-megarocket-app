import { getActivities } from 'Redux/Activities/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import { deleteSubscription } from 'Redux/Subscriptions/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Shared/Button';
import styles from './subscriptionMember.module.css';
import ConfirmModal from '../../../Shared/ConfirmModal';
import ResponseModal from '../../../Shared/ResponseModal';
import { handleDisplayToast } from '../../../../Redux/Shared/ResponseToast/actions';

const SubscriptionsMember = () => {
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const [idToDelete, setIdToDelete] = useState('');

  useEffect(() => {
    getSubscriptions(dispatch);
    getActivities(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getActivitiesName().then((data) => {
      setSubscription(data);
    });
  }, [subscriptions, activities]);

  const getActivitiesName = async () => {
    let arraySubs = [];
    const filterSubscription = subscriptions.filter(
      (item) => item.members._id === '647e03995744e5e9dd299290'
    );

    await filterSubscription.forEach((sub) => {
      activities?.forEach((act) => {
        if (sub.classes.activity === act._id) {
          arraySubs.push({
            subId: sub._id,
            activityName: act.name,
            day: sub.classes.day,
            time: sub.classes.time
          });
        }
      });
    });
    return arraySubs;
  };

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
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Activity</th>
            <th className={styles.th}>Day</th>
            <th className={styles.th}>Time</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {subscription?.map((item) => {
            return (
              <tr className={styles.tr} key={item.subId}>
                <td className={styles.td}>{item.activityName}</td>
                <td className={styles.td}>{item.day}</td>
                <td className={styles.td}>{item.time}</td>
                <td className={styles.button}>
                  <div className={styles.buttonContainer}>
                    <Button
                      text="Unsubscribe"
                      classNameButton="deleteButton"
                      action={() => handleDeleteButton(item.subId)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => setShowConfirmModal(false)}
          title="Unsubscribe Activity"
          reason="delete"
          onAction={() => handleDeleteActivity()}
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
