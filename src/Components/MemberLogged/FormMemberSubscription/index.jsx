import Button from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { getClasses } from 'Redux/Classes/thunks';
import { addSubscriptions } from 'Redux/Subscriptions/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './formMemberSubscription.module.css';

const FormMemberSubscription = () => {
  const { id } = useParams();
  const classes = useSelector((state) => state.classes.data);
  const member = useSelector((state) => state.loginMembers.data);
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subscription, setSubscription] = useState({
    classes: '',
    members: member._id,
    date: new Date()
  });

  useEffect(() => {
    getClasses(dispatch);
  }, [dispatch]);

  const handleShowConfirmModal = async () => {
    if (!showConfirmModal) {
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };
  const filteredClasses = classes.filter(
    (item) => !item.deleted && item.activity && item.activity._id === id
  );

  filteredClasses.sort((a, b) => {
    const dayComparison = a.day.localeCompare(b.day);
    if (dayComparison !== 0) {
      return dayComparison;
    }
    return a.time.localeCompare(b.time);
  });

  const onChangeSelect = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value
    });
    console.log(subscription);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleShowConfirmModal();
  };
  const onConfirm = () => {
    try {
      const newAddSubscription = {
        members: subscription.members,
        classes: subscription.classes,
        date: subscription.date
      };
      addSubscriptions(dispatch, newAddSubscription);
      setShowConfirmModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2>
          {filteredClasses.length !== 0
            ? filteredClasses[0].activity.name
            : 'Esta actividad no tiene clases'}
        </h2>
        <form onSubmit={onSubmit}>
          <select name="classes" onChange={onChangeSelect}>
            <option value="">Select a class</option>
            {filteredClasses.map((item) => (
              <option key={item._id} value={item._id}>
                {item.day}/ {item.time}
              </option>
            ))}
          </select>
          <div className={styles.buttonContainer}>
            <Link to="/user/members/subscribe-class">
              <Button classNameButton={'cancelButton'} text={'Cancel'} />
            </Link>
            {filteredClasses.length !== 0 && (
              <Button text={'Submit'} classNameButton={'submitButton'} />
            )}
          </div>
        </form>
        {showConfirmModal && (
          <ConfirmModal
            handler={() => handleShowConfirmModal()}
            title={'Are you sure?'}
            onAction={() => onConfirm()}
            reason="submit"
          >
            Are you sure ?
          </ConfirmModal>
        )}
      </div>
    </>
  );
};

export default FormMemberSubscription;
