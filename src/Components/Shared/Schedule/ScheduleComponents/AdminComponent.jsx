import React from 'react';

const ScheduleAdmin = ({ props }) => {
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
    return <div>{oneClass.activity.name}</div>;
  }
};

export default ScheduleAdmin;
