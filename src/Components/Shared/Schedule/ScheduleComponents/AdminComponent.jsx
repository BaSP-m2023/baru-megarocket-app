import React, { useEffect, useState } from 'react';
import styles from 'Components/Shared/Schedule/schedule.module.css';

const ScheduleAdmin = ({ props, click }) => {
  const [classFilter, setClassFilter] = useState('');
  const oneClass = props.classes?.find((cl) => {
    return props.day === cl?.day && props.hour === cl?.time;
  });

  useEffect(() => {
    const classFind = props.classes?.find((cl) => {
      if (props.trainerFilter !== '') {
        return (
          props.day === cl?.day &&
          props.hour === cl?.time &&
          cl?.activity?.name.includes(props.activityFilter) &&
          cl?.trainer?._id === props.trainerFilter
        );
      } else {
        return (
          props.day === cl?.day &&
          props.hour === cl?.time &&
          cl?.activity?.name.includes(props.activityFilter)
        );
      }
    });
    setClassFilter(classFind);
  }, [props.activityFilter, props.trainerFilter]);

  if (oneClass) {
    return (
      <div
        className={!classFilter ? `${styles.div} ${styles.filtered}` : styles.div}
        onClick={() => click({ oneClass, reason: 'edit', date: props.date })}
      >
        {oneClass.activity.name}
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.div}`}
        onClick={() =>
          click({
            reason: 'create',
            createData: { day: props.day, time: props.hour },
            date: props.date
          })
        }
      ></div>
    );
  }
};

export default ScheduleAdmin;
