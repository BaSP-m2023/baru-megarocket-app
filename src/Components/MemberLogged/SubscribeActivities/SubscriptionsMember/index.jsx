import { getActivities } from 'Redux/Activities/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      {subscription?.map((item) => (
        <div key={item.subId}>
          <h4>{item.activityName}</h4>
          <span>{item.time}</span>
          <span>{item.day}</span>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionsMember;
