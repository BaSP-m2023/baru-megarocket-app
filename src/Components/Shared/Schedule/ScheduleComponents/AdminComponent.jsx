import React from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleAdmin = ({ props, click }) => {
  const oneClass = props.classes.find((cl) => {
    if (props.trainerFilter !== '') {
      return (
        props.day === cl?.day &&
        props.hour === cl?.time &&
        cl.activity.name.includes(props.activityFilter) &&
        cl.trainer._id === props.trainerFilter
      );
    } else {
      return (
        props.day === cl?.day &&
        props.hour === cl?.time &&
        cl.activity.name.includes(props.activityFilter)
      );
    }
  });

  if (oneClass) {
    return (
      <div className={`${styles.div}`} onClick={() => click({ oneClass, reason: 'edit' })}>
        {oneClass.activity.name}
      </div>
    );
  } else {
    return <div className={`${styles.div}`} onClick={() => click({ reason: 'create' })}></div>;
  }
};

export default ScheduleAdmin;
