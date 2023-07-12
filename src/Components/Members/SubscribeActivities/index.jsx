import React from 'react';
import styles from './subscribeActivities.module.css';

import MemberActivityView from './MemberActivityView';

const SubscribeActivities = () => {
  return (
    <>
      <div className={styles.container}>
        <MemberActivityView />
      </div>
    </>
  );
};

export default SubscribeActivities;
