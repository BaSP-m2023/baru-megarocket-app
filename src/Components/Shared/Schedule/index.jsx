import React, { useEffect, useState } from 'react';
import getScheduleMember from './ScheduleFunctions/memberFunction';
import getScheduleAdmin from './ScheduleFunctions/adminFunction';
import getScheduleTrainer from './ScheduleFunctions/trainerFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActivities } from 'Redux/Activities/thunks';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import Loader from '../Loader';

const Schedule = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const role = sessionStorage.getItem('role');
  const dispatch = useDispatch();
  const { data: classes, isPending: pendingClasses } = useSelector((state) => state.classes);
  const { data: subscriptions, isPending: pendingSubscriptions } = useSelector(
    (state) => state.subscriptions
  );
  const { list: activities, isPending: pendingActivities } = useSelector(
    (state) => state.activities
  );
  const { id } = useParams();
  const [memberSub, setMemberSub] = useState([]);
  const [memberClass, setMemberClass] = useState([]);

  const hours = [];
  for (let i = 9; i <= 21; i++) {
    hours.push(i.toString().padStart(2, '0') + ':00');
    hours.push(i.toString().padStart(2, '0') + ':30');
  }

  useEffect(() => {
    getActivities(dispatch);
    getClasses(dispatch);
    getSubscriptions(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let arraySubs = [];
    if (role === 'MEMBER') {
      const memberSubscription = subscriptions.filter((subs) => {
        return subs.members._id === id;
      });
      setMemberSub(memberSubscription);

      memberSubscription.forEach((sub) => {
        activities?.forEach((act) => {
          if (sub.classes?.activity === act._id) {
            arraySubs.push({
              subId: sub._id,
              activityName: act.name,
              day: sub.classes.day,
              time: sub.classes.time
            });
          }
        });
      });
      setMemberClass(arraySubs);
    }
  }, [subscriptions, activities]);

  console.log(memberClass);

  return (
    <>
      {pendingActivities && pendingClasses && pendingSubscriptions && <Loader />}
      {activities &&
        classes &&
        subscriptions &&
        !pendingActivities &&
        !pendingClasses &&
        !pendingSubscriptions && (
          <table>
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
                <tr key={hour}>
                  <td>{hour}</td>
                  {weekDays.map((day) => {
                    if (role === 'MEMBER' && memberClass.length && memberSub.length) {
                      return (
                        <td key={`${day}-${hour}`}>
                          {getScheduleMember(day, hour, memberClass, memberSub, classes)}
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
        )}
    </>
  );
};

export default Schedule;
