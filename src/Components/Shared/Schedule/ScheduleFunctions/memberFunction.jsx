import React from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleMember = ({ day, hour, memberClass, classes, click }) => {
  const findSub = memberClass.find((memC) => {
    return day === memC?.day && hour === memC?.time;
  });
  if (findSub) {
    return (
      <>
        <div className={styles.div} onClick={() => click(findSub)} id="subscription">
          {findSub.activityName}
        </div>
      </>
    );
  }
  console.log(classes);
  const findClass = classes.find((cl) => {
    return cl.day === day && cl.time === hour;
  });
  if (findClass) {
    return (
      <>
        <div className={styles.div} onClick={() => click(findClass)} id="class">
          {findClass.activity.name}
        </div>
      </>
    );
  }
};

export default ScheduleMember;
