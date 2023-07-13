import React, { useEffect, useState, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import ScheduleMember from './ScheduleComponents/MemberComponent';
import ScheduleAdmin from './ScheduleComponents/AdminComponent';
import ScheduleTrainer from './ScheduleComponents/ScheduleTrainer';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from 'Redux/Activities/thunks';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions, deleteSubscription, addSubscriptions } from 'Redux/Subscriptions/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import ModalData from './ScheduleComponents/Modals/ModalData';
import ModalForm from './ScheduleComponents/Modals/ModalForm/ModalForm';
import styles from 'Components/Shared/Schedule/schedule.module.css';
import Loader from 'Components/Shared/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  const [activeMember, setActiveMember] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSchedule, setShowSchedule] = useState(null);
  const [runHandleActiveMember, setRunHandleActiveMember] = useState(false);
  const [showForm, setShowForm] = useState({
    show: false,
    data: undefined,
    reason: '',
    createData: undefined,
    date: '',
    subscribed: 0
  });
  const [memberSubs, setMemberSubs] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [nextPage, setNextPage] = useState(false);
  const [activityFilter, setActivityFilter] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const weekDays = Array.from({ length: 6 }, (_, index) =>
    format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), index), 'EEEE')
  );
  const nextWeekDays = Array.from({ length: 6 }, (_, index) =>
    format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), index + 7), 'yyyy-MM-dd')
  );
  const weekDate = Array.from({ length: 6 }, (_, index) =>
    format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), index), 'yyyy-MM-dd')
  );
  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
  }
  const current = {
    date: format(new Date(), 'yyyy-MM-dd'),
    day: format(new Date(), 'EEEE'),
    hour: format(new Date(), 'HH:mm'),
    dayNum: format(new Date(), 'i')
  };

  useEffect(() => {
    getActivities(dispatch);
    dispatch(getClasses());
    dispatch(getSubscriptions());
    dispatch(getTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setActiveMember(user.isActive);
      setRunHandleActiveMember(true);
    }
  }, [user]);

  useEffect(() => {
    if (runHandleActiveMember) {
      handleActiveMember();
      setRunHandleActiveMember(false);
    }
  }, [runHandleActiveMember]);

  useEffect(() => {
    if (role === 'TRAINER') {
      setTrainerFilter(user?._id);
    }
  }, [user]);

  const clickMember = (data, date) => {
    const subscribed = subscriptions.filter((subs) => {
      return subs.date.slice(0, 10) === date && subs.classes._id === data._id;
    });
    setShowConfirmModal(true);
    if (data.subId) {
      const trainer = trainers.find((trainer) => trainer._id === data.trainer);
      setModalData({
        ...data,
        trainer,
        date,
        subscribed: subscribed.length
      });
    } else {
      setModalData({
        ...data,
        date,
        subscribed: subscribed.length
      });
    }
  };

  const clickAdmin = ({ oneClass, reason, createData, date }) => {
    const subscribed = subscriptions.filter((subs) => {
      return subs.date.slice(0, 10) === date && subs.classes._id === oneClass?._id;
    });
    if (reason === 'edit') {
      setShowForm({ show: true, data: oneClass, reason, subscribed: subscribed.length, date });
    } else {
      setShowForm({ show: true, reason, createData, date });
    }
  };

  const clickTrainer = (data, date) => {
    const subscribed = subscriptions.filter((subs) => {
      return subs.date.slice(0, 10) === date && subs.classes._id === data._id;
    });
    const membersSubscription = subscriptions?.filter((subs) => {
      return subs.date.slice(0, 10) === date && subs.classes?._id === data._id;
    });
    setMemberSubs(membersSubscription);
    // eslint-disable-next-line no-unused-vars
    const { trainer, ...resData } = data;
    setShowConfirmModal(true);
    setModalData({
      ...resData,
      date,
      subscribed: subscribed.length
    });
  };

  const handleSubmit = (data) => {
    if (data.subId) {
      dispatch(deleteSubscription(data.subId));
    } else {
      if (data.capacity >= data.subscribed) {
        const subData = { classes: data?._id, members: user?._id, date: data.date };
        dispatch(addSubscriptions(subData)).then(() => dispatch(getSubscriptions()));
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
        return subs?.members?._id === user?._id;
      });
      memberSubscription?.forEach((sub) => {
        arraySubs.push({
          subId: sub?._id,
          activityName: sub.classes?.activity?.name,
          day: sub?.classes?.day,
          time: sub?.classes?.time,
          date: sub?.date?.toString().slice(0, 10),
          desc: sub?.classes?.activity?.description,
          _id: sub?.classes?._id,
          capacity: sub?.classes?.capacity,
          subscribed: sub?.classes?.subscribed,
          trainer: sub?.classes?.trainer?._id
        });
      });
      setMemberSubs(arraySubs);
    }
  }, [subscriptions]);

  const getClassName = useMemo(() => {
    return (day, hour, index) => {
      const isToday = day === current.day;
      const isPastHour =
        Number(current.dayNum) - 1 > index ||
        (Number(current.dayNum) - 1 === index && hour < current.hour);
      const currentHourPercent =
        current.hour.split(':')[0] === hour.split(':')[0] &&
        Number(current.dayNum) - 1 === index &&
        `current${Math.trunc((Number(current.hour.split(':')[1]) / 60) * 10)}`;
      const className = `${isToday ? styles.today : ''} ${isPastHour ? styles.pastHour : ''} ${
        currentHourPercent ? styles[currentHourPercent] : ''
      }`;

      return className;
    };
  }, [current.day, current.hour, current.dayNum]);

  const handleActiveMember = () => {
    if (role !== 'MEMBER') {
      setShowSchedule(true);
    } else if (role === 'MEMBER' && activeMember) {
      setShowSchedule(true);
    } else setShowSchedule(false);
  };

  return (
    <>
      {(pendingActivities || pendingClasses || pendingSubscriptions) && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {!pendingActivities &&
        !pendingClasses &&
        !pendingSubscriptions &&
        role === 'MEMBER' &&
        !activeMember && (
          <p className={styles.text}>
            Your membership is not active, please go to your nearest branch to activate it
          </p>
        )}
      {activities &&
        classes &&
        subscriptions &&
        !pendingActivities &&
        !pendingClasses &&
        !pendingSubscriptions &&
        showSchedule && (
          <>
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
              <div>
                <div className={styles.titleContainer}>
                  <h2>{`${format(new Date(current.date), 'MMMM yyyy')}`}</h2>
                  <div className={styles.arrows} onClick={() => setNextPage(!nextPage)}>
                    {!nextPage && (
                      <>
                        <span>Move to next week</span>
                        <FontAwesomeIcon icon={faArrowRight} className={styles.right} />
                      </>
                    )}
                    {nextPage && (
                      <>
                        <span>Move to current week</span>
                        <FontAwesomeIcon icon={faArrowLeft} className={styles.left} />
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.container}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Hour</th>
                        {weekDays.map((day, index) => (
                          <th key={(day, index)}>
                            {!nextPage ? (
                              current.date === weekDate[index] ? (
                                <>
                                  <div className={styles.currentDate}>{day.slice(0, 3)}</div>
                                  <div className={styles.currentDate}>
                                    {new Date(weekDate[index]).getDate() + 1}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{day.slice(0, 3)}</div>
                                  <div> {new Date(weekDate[index]).getDate() + 1} </div>
                                </>
                              )
                            ) : (
                              <>
                                <div>{day.slice(0, 3)}</div>
                                <div> {new Date(nextWeekDays[index]).getDate() + 1} </div>
                              </>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {hours.map((hour) => (
                        <tr key={hour} className={styles.tr}>
                          <td>{hour}</td>
                          {weekDays.map((day, index) => {
                            if (role === 'MEMBER') {
                              const currentDate = !nextPage ? weekDate[index] : nextWeekDays[index];
                              return (
                                <td
                                  className={
                                    !nextPage &&
                                    `${getClassName(day, hour, index)} ${styles.current}`
                                  }
                                  key={`${day}-${hour}`}
                                >
                                  <ScheduleMember
                                    props={{
                                      date: currentDate,
                                      current: !nextPage ? true : false,
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
                              const currentDate = !nextPage ? weekDate[index] : nextWeekDays[index];
                              return (
                                <td
                                  className={
                                    !nextPage &&
                                    `${getClassName(day, hour, index)} ${styles.current}`
                                  }
                                  key={`${day}-${hour}`}
                                >
                                  <ScheduleAdmin
                                    props={{
                                      date: currentDate,
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
                              const currentDate = !nextPage ? weekDate[index] : nextWeekDays[index];
                              return (
                                <td
                                  className={
                                    !nextPage &&
                                    `${getClassName(day, hour, index)} ${styles.current}`
                                  }
                                  key={`${day}-${hour}`}
                                >
                                  <ScheduleTrainer
                                    props={{
                                      date: currentDate,
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
            </div>
          </>
        )}
      {showConfirmModal && modalData && (
        <ModalData
          data={modalData}
          role={role}
          subscribed={modalData.subscribed}
          memberSubs={memberSubs}
          current={current}
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
          subscribed={showForm.subscribed}
          date={showForm.date}
          reason={showForm.reason}
          handler={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default Schedule;
