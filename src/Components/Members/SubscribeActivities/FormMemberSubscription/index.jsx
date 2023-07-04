import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './formMemberSubscription.module.css';

import { getClasses } from 'Redux/Classes/thunks';
import { resetState } from 'Redux/Subscriptions/actions';
import { addSubscriptions, getSubscriptions } from 'Redux/Subscriptions/thunks';
import subscriptionSchema from 'Validations/subscription';

import Button from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import Loader from 'Components/Shared/Loader';

const FormMemberSubscription = () => {
  const { id } = useParams();
  const history = useHistory();
  const { isPending: isPendingClass } = useSelector((state) => state.classes);
  const member = useSelector((state) => state.auth.user);
  const { success, isPending: isPendingSubscription } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [classCanSubscribe, setClassCanSubscribe] = useState([]);
  const [classes, setClasses] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(subscriptionSchema),
    defaultValues: {
      members: member._id,
      classes: ''
    }
  });

  useEffect(() => {
    getClasses(dispatch).then((data) => {
      getSubscriptions(dispatch).then((subscriptions) => {
        filterClassAndOrder(data, subscriptions);
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(resetState());
      history.push('/user/member/subscribe-class');
    }
  }, [success]);

  const filterClassAndOrder = (data, subscriptions) => {
    const filteredClasses = data.filter(
      (item) => !item.deleted && item.activity && item.activity._id === id
    );
    const filterSubscription = subscriptions.filter((item) => item.members._id === member._id);

    const filteredClassesForSubscription = filteredClasses.filter((classItem) =>
      filterSubscription.every((subscription) => subscription.classes?._id !== classItem._id)
    );
    filteredClassesForSubscription.sort((a, b) => {
      const dayComparison = a.day.localeCompare(b.day);
      if (dayComparison !== 0) {
        return dayComparison;
      }
      return a.time.localeCompare(b.time);
    });
    setClassCanSubscribe(filteredClassesForSubscription);
    setClasses(filteredClasses);
  };

  const handleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const onSubmit = () => {
    handleShowConfirmModal();
  };

  const onConfirm = (data) => {
    try {
      addSubscriptions(dispatch, data);
      setShowConfirmModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      {isPendingClass || isPendingSubscription ? (
        <div className={styles.containerLoader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.formContainer} data-testid="activity-subscription-container">
          <h2>
            {classes.length !== 0 ? classes[0].activity.name : 'This activity has no classes'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {classCanSubscribe.length !== 0 ? (
              <select name="classes" {...register('classes')}>
                <option value="">Select a class</option>
                {classCanSubscribe.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.day}/ {item.time}
                  </option>
                ))}
              </select>
            ) : (
              classes.length !== 0 && (
                <p> You are already subscribed to all the classes of this activity</p>
              )
            )}
            {errors.classes && <p className={styles.error}>Please select a class</p>}
            <div className={styles.buttonContainer}>
              <Link to="/user/member/subscribe-class">
                <Button classNameButton={'cancelButton'} text={'Cancel'} />
              </Link>
              {classes.length !== 0 && classCanSubscribe.length !== 0 && (
                <Button text={'Submit'} classNameButton={'submitButton'} />
              )}
            </div>
          </form>
          {showConfirmModal && (
            <ConfirmModal
              handler={handleShowConfirmModal}
              title={'Are you sure?'}
              onAction={handleSubmit(onConfirm)}
              reason="submit"
            >
              Are you sure ?
            </ConfirmModal>
          )}
        </div>
      )}
    </>
  );
};

export default FormMemberSubscription;
