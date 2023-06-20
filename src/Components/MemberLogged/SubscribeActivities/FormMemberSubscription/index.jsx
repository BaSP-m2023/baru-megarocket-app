import Button from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { getClasses } from 'Redux/Classes/thunks';
import { addSubscriptions, getSubscriptions } from 'Redux/Subscriptions/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'Components/Shared/Loader';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import subscriptionSchema from 'Validations/subscription';
import styles from './formMemberSubscription.module.css';
import { resetState } from 'Redux/Subscriptions/actions';

const FormMemberSubscription = () => {
  const { id } = useParams();
  const history = useHistory();
  const { isPending } = useSelector((state) => state.classes);
  const member = useSelector((state) => state.loginMembers.data);
  const { success } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    getSubscriptions(dispatch);
    getClasses(dispatch).then((data) => {
      filterClassAndOrder(data);
    });
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      history.push('/user/members/subscribe-class');
      dispatch(resetState());
    }
  }, [success]);

  const filterClassAndOrder = (data) => {
    const filteredClasses = data.filter(
      (item) => !item.deleted && item.activity && item.activity._id === id
    );
    filteredClasses.sort((a, b) => {
      const dayComparison = a.day.localeCompare(b.day);
      if (dayComparison !== 0) {
        return dayComparison;
      }
      return a.time.localeCompare(b.time);
    });
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
      {isPending ? (
        <div className={styles.containerLoader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.formContainer}>
          <h2>
            {classes.length !== 0 ? classes[0].activity.name : 'This activity has no classes'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select name="classes" {...register('classes')}>
              <option value="">Select a class</option>
              {classes.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.day}/ {item.time}
                </option>
              ))}
            </select>
            {errors.classes && <p className={styles.error}>Please select a class</p>}
            <div className={styles.buttonContainer}>
              <Link to="/user/members/subscribe-class">
                <Button classNameButton={'cancelButton'} text={'Cancel'} />
              </Link>
              {classes.length !== 0 && <Button text={'Submit'} classNameButton={'submitButton'} />}
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
