import React from 'react';
import styles from 'Components/Shared/Schedule/ScheduleComponents/Modals/ModalData/modalData.module.css';
import { Button } from 'Components/Shared/Button';
import { useSelector } from 'react-redux';

const ModalData = ({
  data,
  role,
  memberSubs,
  subscribed,
  closeModal,
  current,
  action,
  reason,
  disabled
}) => {
  const { dark } = useSelector((state) => state.darkmode);
  const currentDate = new Date(current.date).setHours(0, 0, 0, 0);
  const modalDate = new Date(data.date).setHours(0, 0, 0, 0);
  const notShow =
    (currentDate === modalDate && current.hour > data.time) || currentDate > modalDate;
  return (
    <div className={!dark ? styles.modal : styles.darkModal}>
      <div className={styles.modalContent}>
        <div className={styles.headerModal}>
          <h3>Class Details</h3>
          <span onClick={closeModal}>&times;</span>
        </div>
        <div className={styles.containerInfo}>
          <div>
            <h4>Activity</h4>
            <p>{data.subId ? data?.activityName : data.activity?.name}</p>
          </div>
          <div>
            <h4>Description</h4>
            <p>{data.subId ? data?.desc : data.activity?.description}</p>
          </div>
          {role !== 'TRAINER' && (
            <div>
              {data?.trainer ? (
                <>
                  <h4>Trainer</h4>
                  <p>
                    {data.trainer?.firstName} {data.trainer?.lastName}
                  </p>
                </>
              ) : (
                <>
                  <h4>Trainer</h4>
                  <p>There are not trainers for this class</p>
                </>
              )}
            </div>
          )}
          <div>
            <h4>Day & time</h4>
            <p>
              {data.day} at {data.time}
            </p>
          </div>
          <div>
            <h4>Capacity</h4>
            <p>{data.capacity}</p>
          </div>
          <div>
            <h4>Date</h4>
            <p>{data.date}</p>
          </div>
          <div>
            <h4>Members Subscribed</h4>
            <p>{subscribed}</p>
          </div>

          {role === 'MEMBER' && <div></div>}
        </div>
        {role === 'TRAINER' && memberSubs.length !== 0 && (
          <div className={styles.memberTable}>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Membership</th>
                </tr>
              </thead>
              <tbody>
                {memberSubs?.map(
                  (subs) =>
                    subs.members && (
                      <tr key={subs._id}>
                        <td>
                          {subs.members.name} {subs.members.lastName}
                        </td>
                        <td>{subs.members.membership.toUpperCase()}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className={styles.containerButtons}>
          {role !== 'TRAINER' ? (
            <>
              {notShow ? (
                <Button action={closeModal} text={'Close'} classNameButton={'cancelButton'} />
              ) : (
                <Button action={closeModal} text={'Cancel'} classNameButton={'cancelButton'} />
              )}
              {!notShow && (
                <Button
                  action={action}
                  text={`${reason.charAt(0).toUpperCase()}${reason.substring(1)}`}
                  classNameButton={reason === 'subscribe' ? 'submitButton' : 'deleteButton'}
                  disabled={disabled}
                />
              )}
            </>
          ) : (
            <Button action={closeModal} text={'Close'} classNameButton={'cancelButton'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalData;
