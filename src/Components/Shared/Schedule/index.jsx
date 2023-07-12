import React, { useEffect, useState } from 'react';
import ScheduleMember from './ScheduleComponents/MemberComponent';
import ScheduleAdmin from './ScheduleComponents/AdminComponent';
import ScheduleTrainer from './ScheduleComponents/ScheduleTrainer';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from 'Redux/Activities/thunks';
import { addSubscribed, getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions, deleteSubscription, addSubscriptions } from 'Redux/Subscriptions/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import ModalData from './ScheduleComponents/Modals/ModalData';
import ModalForm from './ScheduleComponents/Modals/ModalForm/ModalForm';
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
  const user = useSelector((state) => state.auth.user);
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

  useEffect(() => {
    if (role === 'TRAINER') {
      setTrainerFilter(user?._id);
    }
  }, [user]);

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

  const clickTrainer = (data) => {
    const membersSubscription = subscriptions?.filter((subs) => {
      return subs.classes?._id === data._id;
    });
    setMemberSubs(membersSubscription);
    // eslint-disable-next-line no-unused-vars
    const { trainer, ...resData } = data;
    setShowConfirmModal(true);
    setModalData({
      ...resData
    });
  };

  const handleSubmit = (data) => {
    if (data.subId) {
      data.subscribed = data.subscribed - 1;
      const classData = { subscribed: data.subscribed };
      dispatch(deleteSubscription(data.subId));
      dispatch(addSubscribed(classData, data.classId));
    } else {
      if (data.capacity > data.subscribed) {
        const subData = { classes: data?._id, members: user?._id };
        data.subscribed = data.subscribed + 1;
        dispatch(addSubscriptions(subData)).then(() => dispatch(getSubscriptions()));
        const classData = { subscribed: data.subscribed ? data.subscribed : 1 };
        dispatch(addSubscribed(classData, data._id));
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
        return subs.members?._id === user._id;
      });
      memberSubscription?.forEach((sub) => {
        arraySubs.push({
          subId: sub._id,
          activityName: sub.classes.activity.name,
          day: sub.classes.day,
          time: sub.classes.time,
          desc: sub.classes.activity.description,
          classId: sub.classes._id,
          capacity: sub.classes.capacity,
          subscribed: sub.classes.subscribed,
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
              {role !== 'TRAINER' && (
                <>
                  <label>Filter by Trainer</label>
                  <select onChange={(e) => setTrainerFilter(e.target.value)}>
                    <option value={''}>All trainers</option>
                    {trainers.map((option) => (
                      <option key={option._id} value={`${option._id}`}>
                        {`${option.firstName} ${option.lastName}`}
                      </option>
                    ))}
                  </select>
                </>
              )}
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
                          return (
                            <td key={`${day}-${hour}`}>
                              <ScheduleTrainer
                                props={{
                                  day: day,
                                  hour: hour,
                                  classes: classes,
                                  trainerFilter: trainerFilter,
                                  activityFilter: activityFilter
                                }}
                                click={clickTrainer}
                              />
                            </td>
                          );
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
        <ModalData
          data={modalData}
          role={role}
          memberSubs={memberSubs}
          closeModal={() => setShowConfirmModal(false)}
          action={() => handleSubmit(modalData)}
          reason={
            modalData.subId
              ? 'unsubscribe'
              : modalData.capacity > modalData.subscribed
              ? 'subscribe'
              : 'Full Class'
          }
          disabled={!(modalData.subId || modalData.capacity > modalData.subscribed)}
        />
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
