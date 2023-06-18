import { getActivities } from 'Redux/Activities/thunks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './memberActivity.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MemberActivityView = () => {
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getActivities(dispatch);
  }, [dispatch]);

  const navigate = (id) => {
    history.push(`/user/members/subscribe-class/${id}`);
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {activities.map((activity) => (
          <div
            onClick={() => navigate(activity._id)}
            className={styles.card}
            key={activity._id}
            value={activity._id}
          >
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberActivityView;
