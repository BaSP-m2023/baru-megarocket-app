import React from 'react';
import MemberActivityView from './MemberActivityView';
import styles from './subscribeActivities.module.css';

const SubscribeActivities = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>Sign up for a Class</h2>
        <MemberActivityView />
      </div>
    </>
  );
};

export default SubscribeActivities;
