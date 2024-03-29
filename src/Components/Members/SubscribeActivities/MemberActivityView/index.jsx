import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './memberActivity.module.css';

import { getActivities } from 'Redux/Activities/thunks';

import Loader from 'Components/Shared/Loader';

const MemberActivityView = () => {
  const { dark } = useSelector((state) => state.darkmode);
  const { isPending } = useSelector((state) => state.activities);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className={!dark ? styles.activities : styles.darkActivities}>
      {isPending ? (
        <div className={styles.containerLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <h2 className={styles.title}>Our Activities</h2>
          <div>
            <div className={styles.cardContainer} data-testid="activities-cards-container">
              {activities.map((activity) => (
                <div className={styles.card} key={activity._id} value={activity._id}>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberActivityView;
