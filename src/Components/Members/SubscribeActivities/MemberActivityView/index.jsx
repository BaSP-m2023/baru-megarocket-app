import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import styles from './memberActivity.module.css';

import { getActivities } from 'Redux/Activities/thunks';

import Loader from 'Components/Shared/Loader';

const MemberActivityView = () => {
  const { isPending } = useSelector((state) => state.activities);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    getActivities(dispatch);
  }, [dispatch]);

  const navigate = (id) => {
    history.push(`${url}/${id}`);
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
