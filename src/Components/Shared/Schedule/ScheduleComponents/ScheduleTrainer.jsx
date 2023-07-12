import React from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleTrainer = ({ props, click }) => {
  const oneClass = props.classes?.find((cl) => {
    return (
      props.day === cl?.day &&
      props.hour === cl?.time &&
      cl?.activity?.name?.includes(props.activityFilter) &&
      cl?.trainer?._id === props.trainerFilter
    );
  });
  if (oneClass) {
    return (
      <div className={`${styles.div}`} onClick={() => click(oneClass)}>
        {oneClass.activity?.name}
      </div>
    );
  }
};

export default ScheduleTrainer;
