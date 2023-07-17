import React from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleMember = ({ props, click }) => {
  const findSub = props.memberSubs.find((memC) => {
    if (props.trainerFilter !== '') {
      return (
        props.day === memC?.day &&
        props.hour === memC?.time &&
        memC?.activityName?.includes(props.activityFilter) &&
        memC?.trainer === props.trainerFilter &&
        memC?.date === props.date
      );
    } else {
      return (
        props.day === memC?.day &&
        props.hour === memC?.time &&
        memC?.activityName?.includes(props.activityFilter) &&
        memC?.date === props.date
      );
    }
  });
  if (findSub) {
    return (
      <>
        <div
          className={`${styles.div} ${styles.subscription}`}
          onClick={() => click(findSub, props.date)}
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
        cl.activity?.name?.includes(props.activityFilter) &&
        cl.trainer?._id === props.trainerFilter
      );
    } else {
      return (
        cl.day === props.day &&
        cl.time === props.hour &&
        cl.activity?.name?.includes(props.activityFilter)
      );
    }
  });
  const subscribed = props.subscriptions.filter((subs) => {
    return subs.date.slice(0, 10) === props.date && subs.classes?._id === findClass?._id;
  });
  if (findClass) {
    return (
      <>
        <div
          className={`${styles.div} ${styles.class}`}
          onClick={() => click(findClass, props.date)}
          id="class"
        >
          {findClass?.activity?.name}
          <p>
            Slots: {subscribed?.length}/{findClass.capacity}
          </p>
        </div>
      </>
    );
  }
};

export default ScheduleMember;
