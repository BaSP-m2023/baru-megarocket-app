import React from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleMember = ({ props, click }) => {
  const findSub = props.memberSubs.find((memC) => {
    if (props.trainerFilter !== '') {
      return (
        props.day === memC?.day &&
        props.hour === memC?.time &&
        memC.activityName.includes(props.activityFilter) &&
        memC.trainer === props.trainerFilter
      );
    } else {
      return (
        props.day === memC?.day &&
        props.hour === memC?.time &&
        memC.activityName.includes(props.activityFilter)
      );
    }
  });
  if (findSub) {
    return (
      <>
        <div
          className={`${styles.div} ${styles.subscription}`}
          onClick={() => click(findSub)}
          id="subscription"
        >
          {findSub.activityName}
        </div>
      </>
    );
  }
  const findClass = props.classes.find((cl) => {
    if (props.trainerFilter !== '') {
      return (
        cl.day === props.day &&
        cl.time === props.hour &&
        cl.activity.name.includes(props.activityFilter) &&
        cl.trainer._id === props.trainerFilter
      );
    } else {
      return (
        cl.day === props.day &&
        cl.time === props.hour &&
        cl.activity.name.includes(props.activityFilter)
      );
    }
  });
  if (findClass) {
    return (
      <>
        <div
          className={`${styles.div} ${styles.class}`}
          onClick={() => click(findClass)}
          id="class"
        >
          {findClass.activity.name}
        </div>
      </>
    );
  }
};

export default ScheduleMember;
