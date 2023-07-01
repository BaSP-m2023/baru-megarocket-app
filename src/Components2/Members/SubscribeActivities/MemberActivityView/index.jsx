import { getActivities } from 'Redux/Activities/thunks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'Components/Shared/Loader';
import styles from './memberActivity.module.css';

const MemberActivityView = () => {
  const { isPending } = useSelector((state) => state.activities);
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
      {isPending ? (
        <div className={styles.containerLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <div className={styles.cardContainer} data-testid="activities-cards-container">
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
          </div>
        </>
      )}
    </>
  );
};

export default MemberActivityView;
