import { getActivities } from 'Redux/Activities/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../Shared/Button';
import styles from './subscriptionMember.module.css';

const SubscriptionsMember = () => {
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    getSubscriptions(dispatch);
    getActivities(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getActivitiesName().then((data) => {
      setSubscription(data);
      console.log(data);
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

  return (
    <>
      <table className={styles.table}>
        <thead>
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
                  <Button
                    text="Delete Button"
                    img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                    classNameButton="icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SubscriptionsMember;
