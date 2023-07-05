import React from 'react';
import styles from './subscribeActivities.module.css';

import MemberActivityView from './MemberActivityView';

const SubscribeActivities = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>Our Activities</h2>
        <MemberActivityView />
      </div>
    </>
  );
};

export default SubscribeActivities;
