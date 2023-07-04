import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScheduleMember from './ScheduleFunctions/memberFunction';
import getScheduleAdmin from './ScheduleFunctions/adminFunction';
import getScheduleTrainer from './ScheduleFunctions/trainerFunction';
import { getActivities } from 'Redux/Activities/thunks';
import { addSubscribed, getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions, deleteSubscription, addSubscriptions } from 'Redux/Subscriptions/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import styles from 'Components/Shared/Schedule/schedule.module.css';
import Loader from 'Components/Shared/Loader';

const Schedule = () => {
  const dispatch = useDispatch();
  const role = sessionStorage.getItem('role');
  const { data: classes, isPending: pendingClasses } = useSelector((state) => state.classes);
  const { data: subscriptions, isPending: pendingSubscriptions } = useSelector(
    (state) => state.subscriptions
  );
  const { list: activities, isPending: pendingActivities } = useSelector(
    (state) => state.activities
  );
  const { data: trainers } = useSelector((state) => state.trainers);
  const member = useSelector((state) => state.auth.user);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberSubs, setMemberSubs] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [activityFilter, setActivityFilter] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
  }

  useEffect(() => {
    getActivities(dispatch);
    getClasses(dispatch);
    getSubscriptions(dispatch);
    dispatch(getTrainers());
  }, [dispatch]);

  const click = (data) => {
    setShowConfirmModal(true);
    if (data.subId) {
      const trainer = trainers.find((trainer) => trainer._id === data.trainer);
      setModalData({
        ...data,
        trainer
      });
    } else {
      setModalData({
        ...data
      });
    }
  };

  const handleSubmit = (data) => {
    if (data.subId) {
      data.subscribed = data.subscribed - 1;
      const classData = { subscribed: data.subscribed };
      dispatch(deleteSubscription(data.subId));
      addSubscribed(dispatch, classData, data.classId, history);
    } else {
      if (data.capacity > data.subscribed) {
        const subData = { classes: data?._id, members: member?._id };
        data.subscribed = data.subscribed + 1;
        addSubscriptions(dispatch, subData);
        const classData = { subscribed: data.subscribed ? data.subscribed : 1 };
        addSubscribed(dispatch, classData, data._id, history);
      } else {
        dispatch(setContentToast({ message: 'Full Class', state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    }
    setShowConfirmModal(false);
  };

  useEffect(() => {
    let arraySubs = [];
    if (role === 'MEMBER') {
      const memberSubscription = subscriptions?.filter((subs) => {
        return subs.members._id === member._id;
      });
      memberSubscription?.forEach((sub) => {
        activities?.forEach((act) => {
          if (sub.classes?.activity === act._id) {
            arraySubs.push({
              subId: sub._id,
              activityName: act.name,
              day: sub.classes.day,
              time: sub.classes.time,
              desc: act.description,
              classId: sub.classes._id,
              capacity: sub.classes.capacity,
              subscribed: sub.classes.subscribed,
              trainer: sub.classes.trainer
            });
          }
        });
      });
      setMemberSubs(arraySubs);
    }
  }, [subscriptions, activities]);

  return (
    <>
      {(pendingActivities || pendingClasses || pendingSubscriptions) && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {activities &&
        classes &&
        subscriptions &&
        !pendingActivities &&
        !pendingClasses &&
        !pendingSubscriptions && (
          <div className={styles.content}>
            <div className={styles.filter}>
              <label>Filter by Activity</label>
              <select onChange={(e) => setActivityFilter(e.target.value)}>
                <option value={''}>All classes</option>
                {activities.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <label>Filter by Trainer</label>
              <select onChange={(e) => setTrainerFilter(e.target.value)}>
                <option value={''}>All trainers</option>
                {trainers.map((option) => (
                  <option key={option._id} value={`${option._id}`}>
                    {`${option.firstName} ${option.lastName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.container}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Hour</th>
                    {weekDays.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hours.map((hour) => (
                    <tr key={hour} className={styles.tr}>
                      <td>{hour}</td>
                      {weekDays.map((day) => {
                        if (role === 'MEMBER') {
                          return (
                            <td key={`${day}-${hour}`}>
                              <ScheduleMember
                                props={{
                                  day: day,
                                  hour: hour,
                                  trainerFilter: trainerFilter,
                                  activityFilter: activityFilter,
                                  memberSubs: memberSubs,
                                  classes: classes
                                }}
                                click={click}
                              />
                            </td>
                          );
                        }
                        if (role === 'ADMIN') {
                          return <td key={`${day}-${hour}`}>{getScheduleAdmin()}</td>;
                        }
                        if (role === 'TRAINER') {
                          return <td key={`${day}-${hour}`}>{getScheduleTrainer()}</td>;
                        }
                        return null;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      {showConfirmModal && modalData && (
        <ConfirmModal
          title={'Class details'}
          handler={() => setShowConfirmModal(false)}
          onAction={() => handleSubmit(modalData)}
          reason={modalData.subId ? 'unsubscribe' : 'subscribe'}
        >
          {modalData.subId ? (
            <>
              {`Activity: ${modalData.activityName}`}
              <br />
              {`Description: ${modalData.desc}`}
              <br />
            </>
          ) : (
            <>
              {`Activity: ${modalData.activity.name}`}
              <br />
              {`Description: ${modalData.activity.description}`}
              <br />
            </>
          )}
          {`Trainer: ${modalData.trainer.firstName} ${modalData.trainer.lastName}`}
          <br />
          {`Capacity: ${modalData.capacity}`}
          <br />
          {`Members Subscribed: ${modalData.subscribed}`}
          <br />

          {`${modalData.day} at ${modalData.time}`}
        </ConfirmModal>
      )}
    </>
  );
};

export default Schedule;
