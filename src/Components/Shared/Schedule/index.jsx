import React, { useEffect, useState } from 'react';
import ScheduleMember from './ScheduleComponents/MemberComponent';
import ScheduleAdmin from './ScheduleComponents/AdminComponent';
import getScheduleTrainer from './ScheduleComponents/trainerFunction';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from 'Redux/Activities/thunks';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions, deleteSubscription, addSubscriptions } from 'Redux/Subscriptions/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ModalForm from './ScheduleComponents/ModalForm';
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
  const [showForm, setShowForm] = useState({
    show: false,
    data: undefined,
    reason: '',
    createData: undefined
  });
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
    dispatch(getClasses());
    dispatch(getSubscriptions());
    dispatch(getTrainers());
  }, [dispatch]);

  const clickMember = (data) => {
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

  const clickAdmin = ({ oneClass, reason, createData }) => {
    if (reason === 'edit') {
      setShowForm({ show: true, data: oneClass, reason });
    } else {
      setShowForm({ show: true, reason, createData });
    }
  };

  const handleSubmit = (data) => {
    if (data.subId) {
      dispatch(deleteSubscription(data.subId));
    } else {
      const subData = { classes: data._id, members: member._id };
      dispatch(addSubscriptions(subData)).then(() => dispatch(getSubscriptions()));
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
        arraySubs.push({
          subId: sub._id,
          activityName: sub.classes.activity.name,
          day: sub.classes.day,
          time: sub.classes.time,
          desc: sub.classes.activity.description,
          capacity: sub.classes.capacity,
          trainer: sub.classes.trainer._id
        });
      });
      setMemberSubs(arraySubs);
    }
  }, [subscriptions]);

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
            <div className={styles.filter} data-testid="classes-filters-container">
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
                <tbody data-testid="classes-list">
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
                                click={clickMember}
                              />
                            </td>
                          );
                        }
                        if (role === 'ADMIN') {
                          return (
                            <td key={`${day}-${hour}`}>
                              <ScheduleAdmin
                                props={{
                                  day: day,
                                  hour: hour,
                                  classes: classes,
                                  trainerFilter: trainerFilter,
                                  activityFilter: activityFilter
                                }}
                                click={clickAdmin}
                              />
                            </td>
                          );
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
          {`Remaining slots: ${modalData.capacity}`}
          <br />
          {`${modalData.day} at ${modalData.time}`}
        </ConfirmModal>
      )}
      {showForm.show && (
        <ModalForm
          classes={classes}
          activities={activities}
          classData={showForm.data}
          createData={showForm.createData}
          reason={showForm.reason}
          handler={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default Schedule;
