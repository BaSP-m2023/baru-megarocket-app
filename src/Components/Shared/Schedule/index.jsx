import React, { useEffect, useState } from 'react';
import ScheduleMember from './ScheduleFunctions/memberFunction';
import getScheduleAdmin from './ScheduleFunctions/adminFunction';
import getScheduleTrainer from './ScheduleFunctions/trainerFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActivities } from 'Redux/Activities/thunks';
import { deleteSubscription } from 'Redux/Subscriptions/thunks';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import styles from 'Components/Shared/Schedule/schedule.module.css';
import Loader from 'Components/Shared/Loader';

const Schedule = () => {
  const role = sessionStorage.getItem('role');
  const dispatch = useDispatch();
  const { data: classes, isPending: pendingClasses } = useSelector((state) => state.classes);
  const { data: subscriptions, isPending: pendingSubscriptions } = useSelector(
    (state) => state.subscriptions
  );
  const { list: activities, isPending: pendingActivities } = useSelector(
    (state) => state.activities
  );
  const { data: trainers } = useSelector((state) => state.trainers);
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberClass, setMemberClass] = useState([]);
  const [modalData, setModalData] = useState(null);
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
    hours.push(i.toString().padStart(2, '0') + ':30');
  }

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

  const handleSubmit = (id) => {
    if (id) {
      dispatch(deleteSubscription(id));
    }
  };

  useEffect(() => {
    getActivities(dispatch);
    getClasses(dispatch);
    getSubscriptions(dispatch);
    getTrainers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let arraySubs = [];
    if (role === 'MEMBER') {
      const memberSubscription = subscriptions?.filter((subs) => {
        return subs.members._id === id;
      });
      memberSubscription.forEach((sub) => {
        activities?.forEach((act) => {
          if (sub.classes?.activity === act._id) {
            arraySubs.push({
              subId: sub._id,
              activityName: act.name,
              day: sub.classes.day,
              time: sub.classes.time,
              desc: act.description,
              capacity: sub.classes.capacity,
              trainer: sub.classes.trainer
            });
          }
        });
      });
      setMemberClass(arraySubs);
    }
  }, [subscriptions, activities]);

  return (
    <>
      {pendingActivities && pendingClasses && pendingSubscriptions && <Loader />}
      {activities &&
        classes &&
        subscriptions &&
        !pendingActivities &&
        !pendingClasses &&
        !pendingSubscriptions && (
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
                              day={day}
                              hour={hour}
                              memberClass={memberClass}
                              classes={classes}
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
        )}
      {showConfirmModal && modalData && (
        <ConfirmModal
          title={'Class details'}
          handler={() => setShowConfirmModal(false)}
          onAction={() => handleSubmit(modalData.subId)}
          reason={modalData.subId ? 'unsubscribe' : 'subscribe'}
        >
          {modalData.subId ? (
            <>
              {`Activity: ${modalData.activityName} `}
              {`Description: ${modalData.desc} `}
            </>
          ) : (
            <>
              {`Activity: ${modalData.activity.name} `}
              {`Description: ${modalData.activity.description} `}
            </>
          )}
          {`Trainer: ${modalData.trainer.firstName} ${modalData.trainer.lastName} `}
          {`Remaining slots: ${modalData.capacity} `}
          {`${modalData.day} at ${modalData.time}`}
        </ConfirmModal>
      )}
    </>
  );
};

export default Schedule;
